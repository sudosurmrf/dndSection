/* search all users, search single user, search all dms, search single dm */
/* edit user, delete user, edit dm, delete dm */
/* search all characters, search single character, edit character, delete character */
// client/src/functions/adminFunctions.jsx
import { fetchUsers, deleteUser } from '../api';

export const searchSingleUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const editUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error editing user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// DM Functions
export const searchAllDMs = async () => {
  try {
    const response = await axios.get(`${API_URL}/dms`); // Adjust API endpoint as needed
    return response.data;
  } catch (error) {
    console.error('Error fetching DMs:', error);
    throw error;
  }
};

export const searchSingleDM = async (dmId) => {
  try {
    const response = await axios.get(`${API_URL}/dms/${dmId}`); // Adjust API endpoint as needed
    return response.data;
  } catch (error) {
    console.error('Error fetching DM:', error);
    throw error;
  }
};

export const editDM = async (dmId, dmData) => {
  try {
    const response = await axios.put(`${API_URL}/dms/${dmId}`, dmData); // Adjust API endpoint as needed
    return response.data;
  } catch (error) {
    console.error('Error editing DM:', error);
    throw error;
  }
};

export const deleteDM = async (dmId) => {
  try {
    await axios.delete(`${API_URL}/dms/${dmId}`); // Adjust API endpoint as needed
    return true;
  } catch (error) {
    console.error('Error deleting DM:', error);
    throw error;
  }
};

// Character Functions
export const searchAllCharacters = async () => {
  try {
    const response = await axios.get(`${API_URL}/characters`);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const searchSingleCharacter = async (characterId) => {
  try {
    const response = await axios.get(`${API_URL}/characters/${characterId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

export const editCharacter = async (characterId, characterData) => {
  try {
    const response = await axios.put(
      `${API_URL}/characters/${characterId}`,
      characterData
    );
    return response.data;
  } catch (error) {
    console.error('Error editing character:', error);
    throw error;
  }
};

export const deleteCharacter = async (characterId) => {
  try {
    await axios.delete(`${API_URL}/characters/${characterId}`);
    return true;
  } catch (error) {
    console.error('Error deleting character:', error);
    throw error;
  }
};