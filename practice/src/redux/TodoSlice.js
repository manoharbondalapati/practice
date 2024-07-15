// src/features/todoSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
    title,
    completed: false
  });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, title }) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    title
  });
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (action) => {
        return action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter(todo => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const existingTodo = state.find(todo => todo.id === updatedTodo.id);
        if (existingTodo) {
          existingTodo.title = updatedTodo.title;
        }
      });
  }
});

export default todoSlice.reducer;


