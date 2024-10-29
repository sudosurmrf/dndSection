import { calculateDamage, applyCrit } from './utils'; // Utility functions for damage calculations

export const rollOnce = (atkID, data) => {
  const atkData = data.attack[atkID];
  const extras = getExtraIDs(atkID, 'first', data);
  return [rollWeaponDamage(atkData.mainWeapon, extras, atkData.haste ? 1 : 0, atkData.crit, data)];
};

export const rollOnceEach = (atkID, data) => {
  const atkData = data.attack[atkID];
  if (atkData.offWeapon < 0) return rollOnce(atkID, data);

  const extrasMain = getExtraIDs(atkID, 'first', data);
  const extrasOff = getExtraIDs(atkID, 'firstEach', data);
  const atkMods = getTwoWeaponAtk(atkID, data);

  return [
    rollWeaponDamage(atkData.mainWeapon, extrasMain, atkMods[0], atkData.crit, data),
    rollWeaponDamage(atkData.offWeapon, extrasOff, atkMods[1], atkData.crit, data)
  ];
};

export const rollFull = (atkID, data) => {
  const atkData = data.attack[atkID];
  const atkMods = getTwoWeaponAtk(atkID, data);
  let extras = getExtraIDs(atkID, 'first', data);
  const output = [];

  if (atkData.haste) {
    output.push(rollWeaponDamage(atkData.mainWeapon, extras, atkMods[0], atkData.crit, data));
    extras = getExtraIDs(atkID, 'all', data);
  }

  for (let j = 0; j < data.atks; j++) {
    output.push(rollWeaponDamage(atkData.mainWeapon, extras, atkMods[0] - j * 5, atkData.crit, data));
    if (atkData.offWeapon >= 0 && (j < data.twfFeat || j === 0)) {
      output.push(rollWeaponDamage(atkData.offWeapon, extras, atkMods[1] - j * 5, atkData.crit, data));
    }
  }
  return output;
};