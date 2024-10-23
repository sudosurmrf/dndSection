const API_URL = 'http://localhost:3000/api'; // Update with your API URL

// Helper function for making fetch requests
const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error fetching data');
  }
  return response.json();
};

// Level Up Character
export const levelUpCharacter = async (characterId) => {
  try {
    return await fetchData(`${API_URL}/characters/${characterId}/level-up`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error leveling up character:', error);
    throw error;
  }
};

// Change Character Stats
export const changeCharacterStats = async (characterId, newStats) => {
  try {
    return await fetchData(`${API_URL}/characters/${characterId}/stats`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStats),
    });
  } catch (error) {
    console.error('Error changing character stats:', error);
    throw error;
  }
};

// Gain New Skills
export const gainNewSkills = async (characterId, newSkills) => {
  try {
    return await fetchData(`${API_URL}/characters/${characterId}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills: newSkills }),
    });
  } catch (error) {
    console.error('Error gaining new skills:', error);
    throw error;
  }
};

// Roll for Stats
export const rollStats = (numDice = 4, dropLowest = 1) => {
  const rolls = Array.from(
    { length: numDice },
    () => Math.floor(Math.random() * 6) + 1
  );
  const sortedRolls = rolls.sort((a, b) => a - b);
  const finalRoll = sortedRolls
    .slice(dropLowest)
    .reduce((sum, roll) => sum + roll, 0);
  return finalRoll;
};

// Example of a Dice Roller
export const rollDice = (numSides = 6, numDice = 1) => {
  return Array.from(
    { length: numDice },
    () => Math.floor(Math.random() * numSides) + 1
  );
};
