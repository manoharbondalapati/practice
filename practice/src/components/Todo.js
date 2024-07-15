import React, { useEffect, useState } from 'react';

import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../redux/TodoSlice';


const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const [list, setList] = useState('');
  const [editableId, setEditableId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTitle = (event) => {
    event.preventDefault();
    if (!list) {
      alert('Please enter a title!');
      return;
    }
    dispatch(addTodo(list));
    setList('');
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = (id, title) => {
    setEditableId(id);
    setEditedTitle(title);
  };

  const handleSaveEdit = (id) => {
    dispatch(updateTodo({ id, title: editedTitle }));
    setEditableId(null);
    setEditedTitle('');
  };

  return (
    <div className="container">
      <h1>ToDoList</h1>
      <form onSubmit={handleAddTitle}>
        <input
          type="text"
          value={list}
          onChange={(e) => setList(e.target.value)}
          placeholder="Enter title"
        />
        <button type="submit" id="button">
          Add Title
        </button>
      </form>
      <table striped bordered hover className="tablecontainer" variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>PUBLISHED?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(({ id, title, completed }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>
                {editableId === id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                ) : (title)}
              </td>
              <td>{completed ? 'Yes' : 'No'}</td>
              <td id="actionsbutton">
                {editableId === id ? (
                  <button variant="warning" onClick={() => handleSaveEdit(id)}>
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      variant="warning"
                      onClick={() => handleEditClick(id, title)}
                    >
                      <FaUserEdit />
                    </button>
                    <button variant="danger" onClick={() => handleDelete(id)}>
                      <MdDelete size={20} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
