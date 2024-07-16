// redux/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginUser, loginUserSuccess, loginUserFailure, logoutUser } = loginSlice.actions;

export const loginUserAsync = ({ username, email, navigate }) => async (dispatch) => {
  dispatch(loginUser());

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
    const authenticatedUser = users.find((user) => user.username === username && user.email === email);

    if (authenticatedUser) {
      dispatch(loginUserSuccess(authenticatedUser));
      navigate('/posts');
      console.log('Login successful');
    } else {
      dispatch(loginUserFailure('Invalid username or email'));
      console.log('Login failed');
    }
  } catch (error) {
    dispatch(loginUserFailure('Error occurred during login'));
    console.error('Error occurred during login:', error);
  }
};

export const selectUser = (state) => state.login.user;
export const selectIsAuthenticated = (state) => state.login.isAuthenticated;
export const selectLoading = (state) => state.login.loading;

export default loginSlice.reducer;
