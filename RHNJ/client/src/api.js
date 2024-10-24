const API_URL = 'http://localhost:3000/api';
// Function to handle API requests
const fetchAPI = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Network response was not ok');
  }

  return response.json();
};

// Authentication
export const signup = (userData) =>
  fetchAPI(`${API_URL}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const login = (userData) =>
  fetchAPI(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });

// Characters
export const fetchCharacters = (token) =>
  fetchAPI(`${API_URL}/characters`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createCharacter = (token, characterData) =>
  fetchAPI(`${API_URL}/characters`, {
    method: 'POST',
    body: JSON.stringify(characterData),
    headers: { Authorization: `Bearer ${token}` },
  });

// Add more API functions as needed
