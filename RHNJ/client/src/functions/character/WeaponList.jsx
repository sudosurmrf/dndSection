import React from 'react';

const WeaponList = ({ weapons, setData }) => {
  const handleAddWeapon = () => {
    const newWeapon = { name: '', atk: '', crit: '', base: '', size: '' };
    setData((prevData) => ({
      ...prevData,
      weapons: [...prevData.weapons, newWeapon]
    }));
  };

  const handleRemoveWeapon = (index) => {
    setData((prevData) => ({
      ...prevData,
      weapons: prevData.weapons.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (index, field, value) => {
    const newWeapons = [...weapons];
    newWeapons[index][field] = value;
    setData((prevData) => ({
      ...prevData,
      weapons: newWeapons
    }));
  };

  return (
    <div>
      <h3>Weapons</h3>
      {weapons.map((weapon, index) => (
        <div key={index}>
          <input type="text" placeholder="Name" value={weapon.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
          <input type="text" placeholder="Attack" value={weapon.atk} onChange={(e) => handleChange(index, 'atk', e.target.value)} />
          <input type="text" placeholder="Crit" value={weapon.crit} onChange={(e) => handleChange(index, 'crit', e.target.value)} />
          <input type="text" placeholder="Damage" value={weapon.base} onChange={(e) => handleChange(index, 'base', e.target.value)} />
          <input type="text" placeholder="Size" value={weapon.size} onChange={(e) => handleChange(index, 'size', e.target.value)} />
          <button onClick={() => handleRemoveWeapon(index)}>-</button>
        </div>
      ))}
      <button onClick={handleAddWeapon}>+</button>
    </div>
  );
};

export default WeaponList;