// client/src/components/Login.jsx
import React, { useState } from 'react';
import { login } from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      localStorage.setItem('token', response.data.token);
      console.log('Login successful:', response.data);
      // Redirect to home or another page
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>Log In</button>
    </form>
  );
};

export default Login;