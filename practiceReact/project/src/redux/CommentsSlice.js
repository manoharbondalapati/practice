// redux/commentsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchComments: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCommentsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchComments, fetchCommentsSuccess, fetchCommentsFailure } = commentsSlice.actions;

export const fetchPostCommentsAsync = (postId) => async (dispatch) => {
  dispatch(fetchComments());

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    dispatch(fetchCommentsSuccess(response.data));
  } catch (error) {
    dispatch(fetchCommentsFailure('Error occurred while fetching comments'));
    console.error('Error occurred while fetching comments:', error);
  }
};

export const selectPostComments = (state) => state.comments.comments;
export const selectCommentsLoading = (state) => state.comments.loading;

export default commentsSlice.reducer;
