import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostCommentsAsync, selectPostComments, selectCommentsLoading } from '../redux/CommentsSlice';
import Header from './Header';

const Comments = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(selectPostComments);
  const loading = useSelector(selectCommentsLoading);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostCommentsAsync(postId));
    }
  }, [postId, dispatch]);

  return (
    <div>
        <Header/>
      <h1>Comments for Post {postId}</h1>
      {loading && <p>Loading...</p>}
      {comments.length === 0 && !loading && <p>No comments available.</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
        {comments.map((comment, index) => (
                <tr key={comment.id}>
                  <td>{index + 1}</td>
                  <td>{comment.name}</td>
                  <td>{comment.email}</td>
                  <td>{comment.body}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comments;
