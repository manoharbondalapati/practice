import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  categories: [],
  filteredProducts: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
  sortBy: 'priceLowToHigh', // Default sort option
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
  return response.data;
});

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
        switch (state.sortBy) {
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
      })
      .addCase(fetchProductById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { filterProductsByCategory, sortProducts } = productsSlice.actions;

export default productsSlice.reducer;
