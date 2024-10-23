import React, { useEffect, useState } from 'react';
import { searchAllPlayers, deletePlayer } from '../functions/dmFunctions'; // Adjust imports based on your file structure

const DMHome = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const allPlayers = await searchAllPlayers(); // Implement this function in dmFunctions
        setPlayers(allPlayers);
      } catch (err) {
        setError('Failed to fetch players. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleDelete = async (playerId) => {
    try {
      await deletePlayer(playerId);
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerId)
      );
    } catch (err) {
      setError('Failed to delete player. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading players...</p>;
  }

  return (
    <div>
      <h2>Dungeon Master Home</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Player List</h3>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.username}</td>
              <td>{player.email}</td>
              <td>
                <button onClick={() => handleDelete(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DMHome;
