import React from 'react';
import { logoutUser } from '../redux/LoginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {

const dispatch = useDispatch();
const navigate= useNavigate();

    const handleLogout=()=>
    {
       dispatch(logoutUser())
       navigate('/')
    }
  return (
    <nav>
     <h1>username</h1>
     <button onClick={handleLogout}>Logout</button> 
    </nav>
  )
}

export default Header
