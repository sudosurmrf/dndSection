import React, { useState } from 'react';


const CharacterForm = ({ onClose, refreshCharacters }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [image, setImage] = useState(''); // Assume a URL or path to an image
  const [abilities, setAbilities] = useState([]); // Array for abilities
  const [newAbility, setNewAbility] = useState(''); // Temp holder for new ability input

  const handleAddCharacter = async () => {
    const characterData = {
      name,
      level,
      image,
      abilities,
    };

    try {
      await addCharacter(characterData); // Save character
      refreshCharacters(); // Refresh character list
      onClose(); // Close form
    } catch (error) {
      console.error('Error adding character:', error);
    }
  };

  const handleAddAbility = () => {
    if (newAbility) {
      setAbilities((prevAbilities) => [...prevAbilities, newAbility]);
      setNewAbility(''); // Clear input
    }
  };

  return (
    <div>
      <h3>Add New Character</h3>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Level:
        <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <div>
        <h4>Abilities</h4>
        <ul>
          {abilities.map((ability, index) => (
            <li key={index}>{ability}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add new ability"
          value={newAbility}
          onChange={(e) => setNewAbility(e.target.value)}
        />
        <button onClick={handleAddAbility}>Add Ability</button>
      </div>
      <button onClick={handleAddCharacter}>Save Character</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CharacterForm;