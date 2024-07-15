// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './AuthSlice'; 
// import dataReducer from './DataSlice';
// import themeReducer from './ThemeSlice';
// import todoReducer from '../redux/TodoSlice';
// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     data:dataReducer,
//     theme: themeReducer,
//     todos: todoReducer, // Ensure the key matches the imported reducer
//   },
// });

// export default store;



import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/ProductsSlice';

//import cartReducer from '../redux/CartSlice';

const store = configureStore({
  reducer: {
    
    products: productsReducer,
    //cart: cartReducer,
  },
});

export default store;