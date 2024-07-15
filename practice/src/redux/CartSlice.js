import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      state.cart.splice(index, 1);
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.cart.findIndex((item) => item.id === action.payload);
        state.cart.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    checkout: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, checkout } = cartSlice.actions;
export default cartSlice.reducer;
