import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  searchAllUserCharacters,
  deleteUserCharacter,
} from '../functions/userFunctions'; // Adjust imports as needed
import CharacterForm from '../components/CharacterForm'; // Adjust imports as needed


const PlayerHome = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); 
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    navigate('/login'); // Redirect to the home or login page
  };

  const fetchCharacters = async () => {
    try {
      const allCharacters = await searchAllUserCharacters();
      setCharacters(allCharacters);
    } catch (err) {
      setError('No characters found. Create a character to start!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      <nav>
        <ul>
          <li><Link to='/how-to-play'>How to Play</Link></li>
          <li><Link to='/about-characters'>Characters</Link></li>
          <li><Link to='/dm-home'>DM Home</Link></li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
      <h2>Player Homepage</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Add Character'}
      </button>
      {showForm && (
        <CharacterForm onClose={toggleForm} refreshCharacters={fetchCharacters} />
      )}
      <CharacterSelect characters={characters} />
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
                <button onClick={() => handleDelete(character.id)}>Delete</button>
                <button onClick={() => setSelectedCharacter(character)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCharacter && (
        <div className="character-details">
          <h3>{selectedCharacter.name}'s Details</h3>
          <DataDisplay character={selectedCharacter} />
          <button onClick={() => setSelectedCharacter(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default PlayerHome;
