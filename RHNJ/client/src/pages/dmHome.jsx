import React, { useEffect, useState } from 'react';
import {
  searchAllPlayers,
  invitePlayerToTeam,
  removePlayerFromTeam,
  createTeam,
} from '../functions/dmFunctions'; // Adjust imports based on your file structure

const DMHome = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
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

  /* const handleDelete = async (playerId) => {
    try {
      await removePlayerFromTeam(playerId);
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerId)
      );
    } catch (err) {
      setError('Failed to delete player. Please try again.');
    }
  }; */

  const handleCreateTeam = async () => {
    if (!newTeamName) {
      setError('Team name cannot be empty.');
      return;
    }

    try {
      const createdTeam = await createTeam(newTeamName);
      setTeams((prevTeams) => [...prevTeams, createdTeam]);
      setNewTeamName(''); // Reset the input field after creation
    } catch (err) {
      setError('Failed to create team. Please try again.');
    }
  };

  const handleAssignPlayerToTeam = async (playerId, teamId) => {
    try {
      await invitePlayerToTeam(playerId, teamId);
      // Update state to reflect player assignment
      setTeams((prevTeams) => {
        return prevTeams.map((team) => {
          if (team.id === teamId) {
            return {
              ...team,
              teamPlayers: [...(team.teamPlayers || []), players.find((p) => p.id === playerId)],
            };
          }
          return team;
        });
      });
    } catch (err) {
      setError('Failed to assign player to the team. Please try again.');
    }
  };

  /* if (loading) {
    return <p>Loading players...</p>;
  } */


  return (
    <div>
      <nav>
      <ul>
      <li><Link to='/how-to-play'>How to Play</Link></li>
        <li><Link to='/about-characters'>Characters</Link></li>
        <li><Link to='/player-home'>Player Home</Link></li>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </nav>

      <h2>Diva Manager Home</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Create a New Team</h3>
      <div>
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Enter team name"
        />
        <button onClick={handleCreateTeam}>Create Team</button>
      </div>


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

      <h3>Teams</h3>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.teamname}</td>
              <td>
                <button onClick={() => handleDelete(team.id)}>Delete</button> {/* Adjust as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DMHome;
