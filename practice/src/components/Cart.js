import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProductFromCart, adjustQuantity } from '../redux/CartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  const handleRemove = productId => {
    dispatch(removeProductFromCart(productId));
  };

  const handleAdjustQuantity = (productId, quantity) => {
    dispatch(adjustQuantity({ productId, quantity }));
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        cartItems.map(item => (
          <div key={item.productId}>
            <h3>{item.title}</h3>
            <p>Quantity: 
              <button onClick={() => handleAdjustQuantity(item.productId, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
              {item.quantity}
              <button onClick={() => handleAdjustQuantity(item.productId, item.quantity + 1)}>+</button>
            </p>
            <p>Total: ${item.price * item.quantity}</p>
            <button onClick={() => handleRemove(item.productId)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
