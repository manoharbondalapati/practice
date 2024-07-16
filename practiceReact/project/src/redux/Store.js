import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './LoginSlice';
import postReducer from './PostsSlice';
import commentsReducer from './CommentsSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    posts: postReducer,
    comments: commentsReducer,
    
  },
});

export default store;