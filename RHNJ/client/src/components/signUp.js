// client/src/components/Signup.js
import React, { useState } from 'react';
import { signup } from '../api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ username, password });
      console.log('Signup successful:', response.data);
      // Redirect to login or another page
    } catch (error) {
      console.error('Signup failed:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSignup}>
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
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default Signup;
