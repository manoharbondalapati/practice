import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  categories: [],
  filteredProducts: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
  sortBy: 'none', 
};


const sortProductsList = (products, sortBy) => {
  switch (sortBy) {
    case 'priceLowToHigh':
      return products.slice().sort((a, b) => a.price - b.price);
    case 'priceHighToLow':
      return products.slice().sort((a, b) => b.price - a.price);
    default:
      return products;
  }
};

export const fetchProducts = () => async dispatch => {
  dispatch(isLoading());
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    dispatch(GetAllProducts(response.data));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const fetchCategories = () => async dispatch => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    dispatch(setCategories(response.data));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const fetchProductById = productId => async dispatch => {
  dispatch(isLoading());
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    dispatch(setSelectedProduct(response.data));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    GetAllProducts(state, action) {
      state.products = action.payload;
      state.filteredProducts = sortProductsList(action.payload, state.sortBy);
      state.status = 'succeeded';
    },
    isLoading(state) {
      state.status = 'loading';
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
      state.status = 'succeeded';
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    filterProductsByCategory(state, action) {
      const category = action.payload;
      if (category === 'all') {
        state.filteredProducts = sortProductsList(state.products, state.sortBy);
      } else {
        const filtered = state.products.filter(product => product.category === category);
        state.filteredProducts = sortProductsList(filtered, state.sortBy);
      }
    },
    sortProducts(state, action) {
      state.sortBy = action.payload;
      state.filteredProducts = sortProductsList(state.filteredProducts, state.sortBy);
    },
  },
});

export const { GetAllProducts, setCategories, setSelectedProduct, setError, isLoading, filterProductsByCategory, sortProducts } = productsSlice.actions;

export default productsSlice.reducer;
