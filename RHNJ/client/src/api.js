// client/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust according to your backend
});

// Authentication
export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (userData) => api.post('/auth/login', userData);

// Characters
export const fetchCharacters = (token) =>
  api.get('/characters', { headers: { Authorization: `Bearer ${token}` } });
export const createCharacter = (token, characterData) =>
  api.post('/characters', characterData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Add more API functions as needed
export const fetchUsers = (token) =>
  api.get('/users', { headers: { Authorization: `Bearer ${token}` } });


