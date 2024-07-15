import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/AuthSlice';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate =useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li><Link to='/home'>Home</Link></li>
              <li><Link to='/dashboard'>Dashboard</Link></li>
              <li><button onClick={handleLogout}>LOGOUT</button></li>
            </>
          ) : (
            <li><Link to='/login'>LOGIN</Link></li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
