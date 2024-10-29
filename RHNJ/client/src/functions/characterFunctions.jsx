/* level up and change stats, gain new skills,  choose basic states /*
/* skill modifiers */
/* roll for stats, dice roller if we're even doing this */
/* for each level up, you gail an additional attack die */

import React from 'react';

const CreateCharacter = () => {
  return (
    <div>
      <h1>Create Character</h1>
      <div>
        <label>Name:</label>
        <input type="text" id="charName" />
      </div>
      <div>
        <label>Class:</label>
        <select id="charClass">
          <option value="barbarian">Barbarian</option>
          <option value="bard">Bard</option>
          <option value="cleric">Cleric</option>
          <option value="druid">Druid</option>
          <option value="fighter">Fighter</option>
          <option value="monk">Monk</option>
          <option value="paladin">Paladin</option>
          <option value="ranger">Ranger</option>
          <option value="rogue">Rogue</option>
          <option value="sorcerer">Sorcerer</option>
          <option value="wizard">Wizard</option>
        </select>
      </div>
      <div>
        <label>Level:</label>
        <input type="number" id="charLevel" min="1" />
      </div>
      <button>Create</button>
    </div>
  );
}

export default CreateCharacter;
