import React from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectThemeMode } from '../redux/ThemeSlice';
import '../App.css';


const HomePage = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectThemeMode);
 

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`app ${currentTheme}`}>
     <h1>HomePage</h1> 
     <Navbar/>
     <button onClick={handleToggle}>
      {currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
    <h5>HII Manohar</h5>
    <h5>HII Manohar</h5>
    <h5>HII Manohar</h5>
    </div>
  )
}

export default HomePage
