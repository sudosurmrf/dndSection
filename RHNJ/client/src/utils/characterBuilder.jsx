import React, { useState } from "react";
/* import characters from "./characterList"; */

const CharacterBuilder = ({ characters }) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Handle character selection from the dropdown
  const handleCharacterChange = (event) => {
    const characterId = event.target.value;
    setSelectedCharacterId(characterId);

    // Find the selected character based on ID
    const character = characters.find((char) => char.id === characterId);
    setSelectedCharacter(character);
  };

  return (
    <div>
      <h2>Select a Character</h2>

      {/* Character Dropdown */}
      <label htmlFor="character-select">Choose a Character:</label>
      <select
        id="character-select"
        value={selectedCharacterId}
        onChange={handleCharacterChange}
      >
        <option value="">-- Select a Character --</option>
        {characters.map((character) => (
          <option key={character.id} value={character.id}>
            {character.name}
          </option>
        ))}
      </select>

      {/* Display Selected Character's Stats */}
      {selectedCharacter && (
        <div className="character-stats">
          <h3>{selectedCharacter.name}'s Stats</h3>
          <p>Description: {selectedCharacter.description}</p>
          <ul>
            <li>Level: {selectedCharacter.level}</li>
            <li>Strength: {selectedCharacter.stats.strength}</li>
            <li>Dexterity: {selectedCharacter.stats.dexterity}</li>
            <li>Constitution: {selectedCharacter.stats.constitution}</li>
            <li>Intelligence: {selectedCharacter.stats.intelligence}</li>
            <li>Wisdom: {selectedCharacter.stats.wisdom}</li>
            <li>Charisma: {selectedCharacter.stats.charisma}</li>
          </ul>
          <p>
            Saving Throws:{" "}
            {selectedCharacter.savingThrows.map((save, index) => (
              <span key={index}>{save}{index < selectedCharacter.savingThrows.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
          <p>
            Skills:{" "}
            {selectedCharacter.skills.map((skill, index) => (
              <span key={index}>{skill}{index < selectedCharacter.skills.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
          <p>
            Single-Use Skills:{" "}
            {selectedCharacter.singleUseSkill.map((skill, index) => (
              <span key={index}>{skill}{index < selectedCharacter.singleUseSkill.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
          <p>Hit Points: {selectedCharacter.hitPoints}</p>
          <p>Attack Roll: {selectedCharacter.attackRoll}</p>
          <p>
            Catch Phrases:{" "}
            {selectedCharacter.catchPhrases.map((phrase, index) => (
              <span key={index}>{phrase}{index < selectedCharacter.catchPhrases.length - 1 ? ', ' : ''}</span>
            ))}
          </p>

          {/* New Text Inputs */}
          <label htmlFor="ideals">
            Ideals, convictions, and other things your character holds dear:
          </label>
          <input
            type="text"
            id="ideals"
            name="ideals"
            value={ideals}
            onChange={(e) => setIdeals(e.target.value)}
            placeholder="Enter your character's ideals"
          />

          <label htmlFor="flaws">
            Flaws, skeletons in the closet, and other things that can be used against your character:
          </label>
          <input
            type="text"
            id="flaws"
            name="flaws"
            value={flaws}
            onChange={(e) => setFlaws(e.target.value)}
            placeholder="Enter your character's flaws"
          />

          <label htmlFor="notes">Notes for yourself:</label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter personal notes"
          />
        </div>
      )}
    </div>
  );
};

export default CharacterBuilder;


