import React, { useEffect, useState } from 'react';
import {
  searchAllUserCharacters,
  deleteUserCharacter,
} from '../functions/userFunctions'; // Adjust imports as needed
import CharacterForm from '../components/CharacterForm'; // Component for creating/editing characters

const PlayerHome = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // To toggle the character form

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const allCharacters = await searchAllUserCharacters(); // Implement this function in userFunctions
        setCharacters(allCharacters);
      } catch (err) {
        setError('Failed to fetch characters. Please try again.');
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

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  if (loading) {
    return <p>Loading characters...</p>;
  }

  return (
    <div>
      <h2>Player Home</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Add Character'}
      </button>
      {showForm && (
        <CharacterForm
          onClose={toggleForm}
          refreshCharacters={fetchCharacters}
        />
      )}{' '}
      {/* Assuming CharacterForm handles character creation */}
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
                {/* Add more actions like Edit if needed. text box for notes and flaws and ideals */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerHome;
