import React from 'react';

const AttackList = ({ attacks, weapons, extra, setData }) => {
  const handleAddAttack = () => {
    const newAttack = { mainWeapon: '', offWeapon: '', crit: false, haste: false };
    setData((prevData) => ({
      ...prevData,
      attack: [...prevData.attack, newAttack]
    }));
  };

  const handleChange = (index, field, value) => {
    const newAttacks = [...attacks];
    newAttacks[index][field] = value;
    setData((prevData) => ({
      ...prevData,
      attack: newAttacks
    }));
  };

  return (
    <div>
      <h3>Attacks</h3>
      {attacks.map((attack, index) => (
        <div key={index}>
          Main Weapon:
          <select value={attack.mainWeapon} onChange={(e) => handleChange(index, 'mainWeapon', e.target.value)}>
            {weapons.map((weapon, idx) => (
              <option key={idx} value={weapon.name}>{weapon.name}</option>
            ))}
          </select>
          Off-Hand Weapon:
          <select value={attack.offWeapon} onChange={(e) => handleChange(index, 'offWeapon', e.target.value)}>
            <option value="-1">None</option>
            {weapons.map((weapon, idx) => (
              <option key={idx} value={weapon.name}>{weapon.name}</option>
            ))}
          </select>
          <input type="checkbox" checked={attack.crit} onChange={(e) => handleChange(index, 'crit', e.target.checked)} /> Can Crit
          <input type="checkbox" checked={attack.haste} onChange={(e) => handleChange(index, 'haste', e.target.checked)} /> Haste
        </div>
      ))}
      <button onClick={handleAddAttack}>+</button>
    </div>
  );
};

export default AttackList;