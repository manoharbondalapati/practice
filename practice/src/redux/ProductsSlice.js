// productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  products: [],
  categories: [],
  filteredProducts: [],
  status: 'idle',
  error: null,
  sortBy: 'newest', // Default sort option
};

// Define async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

// Define async thunk for fetching categories
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
});

// Define the products slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProductsByCategory(state, action) {
      const category = action.payload;
      if (category === 'all') {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(product => product.category === category);
      }
    },
    sortProducts(state, action) {
      const sortBy = action.payload;
      state.sortBy = sortBy;
      switch (sortBy) {
        case 'priceLowToHigh':
          state.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceHighToLow':
          state.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload.slice(); // Initialize filteredProducts with all products
        // Sort initially based on default sortBy option
        switch (state.sortBy) {
          case 'newest':
            state.filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
          case 'popular':
            // Implement logic for sorting by popularity (e.g., number of views or sales)
            state.filteredProducts.sort((a, b) => b.popularity - a.popularity);
            break;
          case 'priceLowToHigh':
            state.filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'priceHighToLow':
            state.filteredProducts.sort((a, b) => b.price - a.price);
            break;
          default:
            break;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { filterProductsByCategory, sortProducts } = productsSlice.actions;

export default productsSlice.reducer;
