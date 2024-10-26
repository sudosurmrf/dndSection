// client/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust according to your backend
});

// Authentication
export const signup = async (userData) => {
  return await api.post('/auth/signup', userData); };
export const login = async (userData) => {
  return await api.post('/auth/login', userData); }

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

/* export const deleteUser = (token, userId) =>
  api.delete(`/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });

export const fetchUser = (token, userId) =>
  api.get(`/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } }); 

export const updateUser = (token, userId, userData) =>
  api.put(`/users/${userId}`, userData, { headers: { Authorization: `Bearer ${token}` } });

export const fetchUserCharacters = (token, userId) =>
  api.get(`/users/${userId}/characters`, { headers: { Authorization: `Bearer ${token}` } });

export const fetchCharacter = (token, characterId) =>
  api.get(`/characters/${characterId}`, { headers: { Authorization: `Bearer ${token}` } });

export const updateCharacter = (token, characterId, characterData) =>
  api.put(`/characters/${characterId}`, characterData, { headers: { Authorization: `Bearer ${token}` } });

export const deleteCharacter = (token, characterId) =>
  api.delete(`/characters/${characterId}`, { headers: { Authorization: `Bearer ${token}` } });

export default api; */



