import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, selectLoading } from '../redux/LoginSlice';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const navigate = useNavigate(); 

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync({
      username,
      email,
      navigate:()=>navigate('/posts') 
    }));
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Email:</label>
        <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
};

export default Login;
