import React from 'react';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Nav.css'

const Nav = () => {
    const cart = useSelector((state) => state.cart.cart);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          {totalItems > 0 && <span>({totalItems})</span>}
        </Link>
      </nav>
    );
  };

export default Nav
