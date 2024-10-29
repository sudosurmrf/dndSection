import React from 'react';

const StatsTable = ({ stats, setData }) => {
  const handleChange = (stat, value) => {
    setData((prevData) => ({
      ...prevData,
      stats: {
        ...prevData.stats,
        [stat]: value
      }
    }));
  };

  return (
    <div>
      <h3>Stats</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Base</th>
            <th>Temp</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stats).map((stat) => (
            <tr key={stat}>
              <td>{stat}</td>
              <td><input type="text" value={stats[stat].base} onChange={(e) => handleChange(stat, e.target.value)} /></td>
              <td><input type="text" value={stats[stat].temp} onChange={(e) => handleChange(stat, e.target.value)} /></td>
              <td>{/* Calculate and display total */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;