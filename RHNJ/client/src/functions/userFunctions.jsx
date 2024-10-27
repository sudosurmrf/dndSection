<<<<<<< HEAD
=======
/*search all and serch single player*/
/* search all user characters, search single user character, edit user character, delete user character */
>>>>>>> main
const API_URL = 'http://localhost:3000/api'; // Update with your API URL

// Helper function for making fetch requests
const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error fetching data');
  }
  return response.json();
};

// Search all users
export const searchAllUsers = async () => {
  try {
    return await fetchData(`${API_URL}/users`);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Search a single user
export const searchSingleUser = async (userId) => {
  try {
    return await fetchData(`${API_URL}/users/${userId}`);
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Search all characters for a user
export const searchAllUserCharacters = async (userId) => {
  try {
    return await fetchData(`${API_URL}/users/${userId}/characters`);
  } catch (error) {
    console.error('Error fetching user characters:', error);
    throw error;
  }
};

// Search a single user character
export const searchSingleUserCharacter = async (characterId) => {
  try {
    return await fetchData(`${API_URL}/characters/${characterId}`);
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

// Edit user character
export const editUserCharacter = async (characterId, updatedData) => {
  try {
    return await fetchData(`${API_URL}/characters/${characterId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
  } catch (error) {
    console.error('Error updating character:', error);
    throw error;
  }
};

// Delete user character
export const deleteUserCharacter = async (characterId) => {
  try {
    return await fetchData(`${API_URL}/characters/${characterId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting character:', error);
    throw error;
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> main
