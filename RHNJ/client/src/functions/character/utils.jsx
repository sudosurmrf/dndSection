import React from 'react';

export const calculateDamage = (rolls) => {
    let totalDamage = rolls.plus;
    for (const die in rolls.dice) {
      totalDamage += rolls.dice[die] * parseInt(die.replace('d', ''));
    }
    return totalDamage;
  };
  
  export const applyCrit = (obj, mult) => {
    for (const die in obj) {
      obj[die] *= mult;
    }
  };