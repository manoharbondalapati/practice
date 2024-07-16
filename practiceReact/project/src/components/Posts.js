import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPostsAsync,
  selectUserPosts,
  selectPostsLoading,
} from "../redux/PostsSlice";
import { selectUser } from "../redux/LoginSlice";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const posts = useSelector(selectUserPosts);
  const loading = useSelector(selectPostsLoading);
  const navigate=useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPostsAsync(user.id));
    }
  }, [user, dispatch]);


  const handleCommentsClick= (postId)=>
  {
    navigate(`/comments/${postId}`);
  }

  return (
    <div>
      <Header />
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {posts.length === 0 && !loading && <p>No posts available.</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>title</th>
            <th>ACtions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post,index) => (
            <tr key={post.id}>
              <td>{index+1}</td>
              <td>{post.title}</td>
              <td>{post.title}</td>
              <td>
                <button onClick={() => handleCommentsClick(post.id)}>Comments</button>
              </td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
