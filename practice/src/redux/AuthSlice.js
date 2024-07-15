
// redux/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const loginAdmin = (credentials, navigate) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const user = response.data.find(
      (user) => user.username === credentials.username && user.email === credentials.email
    );

    if (user) {
      dispatch(loginSuccess(user));
      navigate('/dashboard');
      alert('Login Success');
    } else {
      dispatch(loginFailure('Invalid Credentials'));
      alert('Login failed');
    }
  } catch (error) {
    dispatch(loginFailure('An error occurred during login'));
    alert('Login failed');
  }
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = AuthSlice.actions;

export default AuthSlice.reducer;