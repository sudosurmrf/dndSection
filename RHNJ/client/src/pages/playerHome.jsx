import React, { useEffect, useState } from 'react';
import {
  searchAllUserCharacters,
  deleteUserCharacter,
} from '../functions/userFunctions'; // Adjust imports as needed
/* import CharacterForm from '././components/CharacterForm'; // Component for creating/editing characters */

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
              /* from https://codepen.io/terminalGradience/pen/ENQRpp */
   {/*            <div class="vertField">Stats:<br>
  <table id="statsTable">
    <tr>
      <td/>
      <td> Base </td>
      <td> Temp </td>
      <td class="outcol"> Total </td>
    </tr>
    <tr id="statProto" class="prototype">
      <td> USTAT </td>
      <td> <input type="text" class="statfield" id="lstatBase" value="10"> </td>
      <td> <input type="text" class="statfield" id="lstatTemp" value="+0"> </td>
      <td> <span id="lstatOut">10 (+0)</span> </td>
    </tr>
    <tr><td colspan="4"/></tr><tr><td colspan="4"/></tr>
    <tr>
      <td>ATK</td>
      <td><input type="text" class="statfield" id="babBase" value="+0"></td>
      <td><input type="text" class="statfield" id="babTemp" value="+0"></td>
      <td><span id="babOut"> +0 </span></td>
    </tr>
  </table>
  <p>
    Two Weapon Fighting:
    <select id="twfFeat">
      /* lets put in the ideals and flaws here */
      /*
    </select>
  </p>
  
  
</div>
/* should change these to be abilities and once per day skills */
/*
<div class="vertField">Weapons:<br>
  <form id="weapon0" class="prototype">
    Name: <input type="text" name="name" value="Club">
    <input type="button" name="remove" value="-" class="removeBtn"><br />
    Attack +<input type="text" name="atk" value="str"> 
    Crit: <input type="text" name="crit" value="x2"><br />
    Damage: Base <input type="text" name="base" value="1d6 + str"> 
    + <input type="text" name="bonus"><br />
    Size:
    <input type="radio" name="size" value="two"> Two Hand
    <input type="radio" name="size" value="one" checked> One Hand 
    <input type="radio" name="size" value="light"> Light
  </form>
  <div id=weaponList></div>
  <input type="button" id="addWeapon" value="+">
</div>
<div class="vertField">Special Attacks:
  <form id="special0" class="prototype">
    Name: <input type="text" name="name" value="Sneak Attack">
    <input type="button" name="remove" value="-" class="removeBtn"><br>
    Attack: <input type="text" name="atk"><br>
    Damage: <input type="text" name="base" value="1d6"><br>
    Bonus on Crit: <input type="text" name="crit"><br>
    Add To:
    <input type="radio" name="addTo" value="first" checked> First
    <input type="radio" name="addTo" value="firstEach"> First per Weapon 
    <input type="radio" name="addTo" value="all"> All
  </form>
  <div id="specialList"></div>
  <input type="button" id="addSpecial" value="+">
</div>
<div class="vertField">Attacks:
  <form id="attack0" class="prototype">
    Main Weapon 
    <select name="mainWeapon">
    </select>
    <input type="button" name="remove" value="-" class="removeBtn"><br />
    Off-Hand Weapon 
    <select name="offWeapon" disabled>
      <option value="-1"> </option>
    </select><br />
    Can Crit: <input type="checkbox" name="crit" checked/>
    Haste: <input type="checkbox" name="haste" /><br />
    Extra Damage:
    <div>
      N/A
    </div>
    Roll:
    <input type="button" name="oneRoll" value="Once">
    <input type="button" name="eachRoll" value="Once Each">
    <input type="button" name="fullRoll" value="Full Attack">
  </form>
  <div id="attackList"></div>
  <input type="button" id="addAttack" value="+">
</div>
<div class="vertField">
  <input type="button" id="exportbtn" value="Export" />
  <input type="button" id="importbtn" value="Import" /> <br />
  <textarea id="inOutField" cols="45" rows="2" placeholder='Hit "export" to print current configuration or copy exported data here and hit "import"'></textarea>
</div>
 */}
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





