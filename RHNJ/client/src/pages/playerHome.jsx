import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
=======
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> main
import {
  searchAllUserCharacters,
  deleteUserCharacter,
} from '../functions/userFunctions'; // Adjust imports as needed
<<<<<<< HEAD
// import CharacterForm from './components/CharacterForm'; // Component for creating/editing characters
=======
/* import CharacterForm from '././components/CharacterForm'; // Component for creating/editing characters */
>>>>>>> main

const PlayerHome = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  // const [showForm, setShowForm] = useState(false); // To toggle the character form
=======
  const [showForm, setShowForm] = useState(false); // To toggle the character form
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    navigate('/'); // Redirect to the home or login page
  };
>>>>>>> main

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const allCharacters = await searchAllUserCharacters(); // Implement this function in userFunctions
        setCharacters(allCharacters);
      } catch (err) {
<<<<<<< HEAD
        setError('Failed to fetch characters. Please try again.');
=======
        setError('You have no characters, yet. Please create a character to start your quest!');
>>>>>>> main
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleDelete = async (characterId) => {
    try {
      await deleteUserCharacter(characterId);
      setCharacters((prevCharacters) =>
        prevCharacters.filter((char) => char.id !== characterId)
      );
    } catch (err) {
      setError('Failed to delete character. Please try again.');
    }
  };

<<<<<<< HEAD
  // const toggleForm = () => {
  //   setShowForm((prev) => !prev);
  // };
=======
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };
>>>>>>> main

  if (loading) {
    return <p>Loading characters...</p>;
  }

  return (
    <div>
<<<<<<< HEAD
      <h2>Player Home</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* <button onClick={toggleForm}>
=======
      <nav>
      <ul>
      <li>
          <Link to='/how-to-play'>How to Play</Link>
        </li>
        <li>
          <Link to='/about-characters'>Characters</Link>
        </li>
        <li>
          <Link to='/dm-home'>DM Home</Link>
        </li>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
      <h2>Player Homepage</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={toggleForm}>
>>>>>>> main
        {showForm ? 'Cancel' : 'Add Character'}
      </button>
      {showForm && (
        <CharacterForm
          onClose={toggleForm}
          refreshCharacters={fetchCharacters}
        />
      )}{' '}
<<<<<<< HEAD
      Assuming CharacterForm handles character creation */}
=======
      {/* Assuming CharacterForm handles character creation */}
>>>>>>> main
      <h3>Your Characters</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.id}>
              <td>{character.name}</td>
              <td>{character.level}</td>
              <td>
                <button onClick={() => handleDelete(character.id)}>
                  Delete
                </button>
<<<<<<< HEAD
                {/* Add more actions like Edit if needed */}
=======
                {/* Add more actions like Edit if needed. text box for notes and flaws and ideals */}
>>>>>>> main
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
<<<<<<< HEAD

export default PlayerHome;
=======

export default PlayerHome;





>>>>>>> main
