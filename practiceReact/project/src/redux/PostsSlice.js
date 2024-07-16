// redux/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchPosts, fetchPostsSuccess, fetchPostsFailure } = postsSlice.actions;

export const fetchUserPostsAsync = (userId) => async (dispatch) => {
  dispatch(fetchPosts());

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    dispatch(fetchPostsSuccess(response.data));
  } catch (error) {
    dispatch(fetchPostsFailure('Error occurred while fetching posts'));
    console.error('Error occurred while fetching posts:', error);
  }
};

export const selectUserPosts = (state) => state.posts.posts;
export const selectPostsLoading = (state) => state.posts.loading;

export default postsSlice.reducer;
