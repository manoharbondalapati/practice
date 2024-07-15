import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const { id, title, price } = action.payload;
      const existingItem = state.cartItems.find(item => item.productId === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          productId: id,
          title,
          price,
          quantity: 1,
        });
      }
    },
    removeProductFromCart(state, action) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.productId !== productId);
    },
    adjustQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addProductToCart, removeProductFromCart, adjustQuantity } = cartSlice.actions;

export default cartSlice.reducer;
