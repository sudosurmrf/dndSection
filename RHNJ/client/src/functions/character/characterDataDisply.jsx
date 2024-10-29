 /* https://codepen.io/terminalGradience/pen/ENQRpp */
 import React, { useState } from 'react';
 import StatsTable from './StatsTable';
 import BABControl from './BABControl';
 import WeaponList from './WeaponList';
 import SpecialAbilities from './SpecialAbilities';
 import AttackList from './AttackList';
 import ExportButton from './ExportButton';
 import ImportButton from './ImportButton';
 import ClearOutputButton from './ClearOutputButton';
 
 const DataDisplay = () => {
   const [data, setData] = useState({
     stats: { /*...initial stats data*/ },
     bab: 0,
     ab: 0,
     weapons: [],
     extra: [],
     attack: []
   });
 
   return (
     <div>
       <StatsTable stats={data.stats} setData={setData} />
       <BABControl bab={data.bab} setData={setData} />
       <WeaponList weapons={data.weapons} setData={setData} />
       <SpecialAbilities extra={data.extra} setData={setData} />
       <AttackList attacks={data.attack} weapons={data.weapons} extra={data.extra} setData={setData} />
       <ExportButton data={data} />
       <ImportButton setData={setData} />
       <ClearOutputButton setOutput={() => setData((prevData) => ({ ...prevData, output: "" }))} />
     </div>
   );
 };
 
 export default DataDisplay;

 /*  
    return {
        <div>
        <div class="vertField">Stats:<br>
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
      <option value="0" selected>No Feat</option>
      <option value="1">Have Feat</option>
      <option value="2">Improved</option>
      <option value="3">Greater</option>
      <option value="4">Epic</option>
    </select>
  </p>
  <p>
    Confirm Crits:
    <input id="critConf" type="checkbox" checked/>
    Bonus:
    <input id="confBonus" class="atkfield" type="text" value="+0"/>
  </p>
  <p>
    Target's AC:
    <input id="targAC" class="atkfield" type="number" value="10"/>
  </p>
  Output:
  <span id="outTotal"></span>
  <input id="outClear" type="button" value="Clear"/>
  <div id="output">
  </div>
</div>

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

    }}; */