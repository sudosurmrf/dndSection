 import React from 'react';
 /* https://codepen.io/terminalGradience/pen/ENQRpp */

export default function = DataDisplay () => {

const data = {
    stats:{
    str:{ base:10, temp:0, mod:0 },
    dex:{ base:10, temp:0, mod:0 },
    con:{ base:10, temp:0, mod:0 },
    int:{ base:10, temp:0, mod:0 },
    wis:{ base:10, temp:0, mod:0 },
    cha:{ base:10, temp:0, mod:0 }
    },
    bab:0, ab:0, confB:0, atks:1, twfFeat:0,
    weapons:[], extra:[], attack:[], conf: true
  };
  
  var i=2;
  var statsTable = document.getElementById("statsTable");
  for(var stat in data.stats){
    if(data.stats.hasOwnProperty(stat)){
      buildStat(stat, i);
      i++;
    }
  }
  
  function buildStat( stat, id ){
    var row = statsTable.insertRow(id);
    row.id = "stat" + stat;
    row.innerHTML = document.getElementById("statProto").innerHTML.replace("USTAT", stat.toUpperCase()).replace(/lstat/g, stat);
    var baseField = document.getElementById(stat + "Base");
    baseField.value = data.stats[stat].base;
    var tempField = document.getElementById(stat + "Temp");
    tempField.value = (data.stats[stat].temp >= 0 ? "+" : "") + data.stats[stat].temp;
    var outField = document.getElementById(stat + "Out");
    baseField.onchange = tempField.onchange = function(){
      data.stats[stat].base = Math.floor(eval(baseField.value));
      data.stats[stat].temp = Math.floor(eval(tempField.value));
      var totalBase = data.stats[stat].base + data.stats[stat].temp;
      var mod = (totalBase - 10 - (totalBase%2))/2;
      data.stats[stat].mod = mod;
      var out = totalBase + " (" + (mod > -1? "+" : "") + mod + ")";
      outField.innerHTML = out;
    }
    baseField.onchange();
  }
  
  document.getElementById("babBase").onchange = document.getElementById("babTemp").onchange = function(){
    data.bab = Math.floor(eval( document.getElementById("babBase").value ));
    data.ab = data.bab + Math.floor(eval( document.getElementById("babTemp").value ));
    data.atks = Math.floor((data.bab-1)/5) + 1;
    if(data.atks > 4) data.atks = 4;
    var abstring = (data.ab >= 0 ? "+" : "") + data.ab;
    for(var i = 1; i < data.atks; i++){
      var curAB = data.ab - (i*5);
      abstring += (curAB >= 0 ? "/+" : "/") + ( data.ab - (i*5) );
    }
    document.getElementById("babOut").innerHTML = abstring;
  }
  
  document.getElementById("twfFeat").onchange = function(){
    data.twfFeat = document.getElementById("twfFeat").value;
  }
  
  document.getElementById("critConf").onchange = function(){
    data.conf = document.getElementById("critConf").checked;
  }
  
  document.getElementById("confBonus").onchange = function(){
    data.confB = Math.floor(eval(document.getElementById("confBonus").value));
  }
  
  document.getElementById("addWeapon").onclick = function(){
    var weaponForm = document.getElementById("weapon0").cloneNode(true);
    i=1;
    while(document.getElementById("weapon"+i) != null){
      i++;
    }
    weaponForm.id = "weapon"+i;
    weaponForm.removeAttribute("class");
    document.getElementById("weaponList").appendChild(weaponForm);
    data.weapons.push({});
    weaponForm.onchange = function(){
      data.weapons[parseInt(weaponForm.id.replace("weapon","")) - 1] = {
        name : weaponForm.elements["name"].value, atk : weaponForm.elements["atk"].value,
        crit : weaponForm.elements["crit"].value, base : weaponForm.elements["base"].value,
        bonus : weaponForm.elements["bonus"].value, size : weaponForm.elements["size"].value
      };
      updateAttacks();
    }
    weaponForm.onchange();
    weaponForm.elements["remove"].onclick = function(){
      document.getElementById("weaponList").removeChild(weaponForm);
      i=parseInt(weaponForm.id.replace("weapon",""));
      data.weapons.splice(i - 1, 1);
      while(document.getElementById("weapon"+(i+1)) != null){
        document.getElementById("weapon"+(i+1)).id = "weapon"+i;
        i++;
      }
      updateAttacks();
    }
  }
  document.getElementById("addSpecial").onclick = function(){
    var specialForm = document.getElementById("special0").cloneNode(true);
    i=1;
    while(document.getElementById("special"+i) != null){
      i++;
    }
    specialForm.id = "special"+i;
    specialForm.removeAttribute("class");
    document.getElementById("specialList").appendChild(specialForm);
    data.extra.push({});
    specialForm.onchange = function(){
      data.extra[parseInt(specialForm.id.replace("special","")) - 1] = {
        name : specialForm.elements["name"].value, atk : specialForm.elements["atk"].value,
        base : specialForm.elements["base"].value, crit : specialForm.elements["crit"].value,
        addTo : specialForm.elements["addTo"].value
      };
      updateAttacks();
    }
    specialForm.onchange();
    specialForm.elements["remove"].onclick = function(){
      document.getElementById("specialList").removeChild(specialForm);
      i=parseInt(specialForm.id.replace("special",""));
      data.extra.splice(i - 1, 1);
      for(var j = 0; j < data.attack.length; j++){
        data.attack[j].extra.splice(i - 1, 1);
      }
      while(document.getElementById("special"+(i+1)) != null){
        document.getElementById("special"+(i+1)).id = "special"+i;
        i++;
      }
      updateAttacks();
    }
  }
  
  document.getElementById("addAttack").onclick = function(){
    var attackForm = document.getElementById("attack0").cloneNode(true);
    i=1;
    while(document.getElementById("attack"+i) != null){
      i++;
    }
    attackForm.id = "attack"+i;
    attackForm.removeAttribute("class");
    document.getElementById("attackList").appendChild(attackForm);
    data.attack.push({});
    attackForm.onchange = function(){
      if(data.weapons.length < 1 ||
         data.weapons[parseInt(attackForm.elements["mainWeapon"].value) || 0].size == "two"){
        offWeapon:attackForm.elements["offWeapon"].value = -1;
        offWeapon:attackForm.elements["offWeapon"].disabled = true;
      }
      else{
        offWeapon:attackForm.elements["offWeapon"].disabled = false;
      }
      
      var extra = [];
      for(var i = 0; i < data.extra.length; i++){
        if(attackForm.elements["extra" + i] != null)
          extra.push(attackForm.elements["extra" + i].checked);
      }
      while(extra.length < data.extra)
        extra.push(false);
      data.attack[parseInt(attackForm.id.replace("attack","")) - 1] = {
        mainWeapon : attackForm.elements["mainWeapon"].value, 
        offWeapon : attackForm.elements["offWeapon"].value,
        crit : attackForm.elements["crit"].checked,
        haste : attackForm.elements["haste"].checked, extra : extra
      };
    }
    attackForm.onchange();
    updateAttacks();
    attackForm.elements["oneRoll"].onclick = function(){
      i = parseInt(attackForm.id.replace("attack",""));
      rollOnce(i-1);
    }
    attackForm.elements["eachRoll"].onclick = function(){
      i = parseInt(attackForm.id.replace("attack",""));
      rollOnceEach(i-1);
    }
    attackForm.elements["fullRoll"].onclick = function(){
      i = parseInt(attackForm.id.replace("attack",""));
      rollFull(i-1);
    }
    attackForm.elements["remove"].onclick = function(){
      document.getElementById("attackList").removeChild(attackForm);
      i = parseInt(attackForm.id.replace("attack",""));
      data.attack.splice(i - 1, 1);
      while(document.getElementById("attack"+(i+1)) != null){
        document.getElementById("attack"+(i+1)).id = "attack"+i;
        i++;
      }
    }
  }
  
  function updateAttacks(){
    for( var j = 1; j <= data.attack.length; j++ ){
      var attackForm = document.getElementById("attack"+(j));
      var mainWeapon = attackForm.elements["mainWeapon"];
      var offWeapon = attackForm.elements["offWeapon"];
      //update weapon lists
      var mainSelection = null, offSelection = null;
      if(mainWeapon.options.length > 0){
        mainSelection = mainWeapon.options[parseInt(mainWeapon.selectedIndex)].text;
        offSelection = offWeapon.options[parseInt(offWeapon.selectedIndex)].text;
        if(mainWeapon.options.length != data.weapons.length)
          mainWeapon.value = offWeapon.value = 0;
      }
      while(mainWeapon.length > 0) mainWeapon.remove(mainWeapon.length - 1);
      while(offWeapon.length > 1) offWeapon.remove(offWeapon.length - 1);
      for( i = 0; i < data.weapons.length; i++ ){
        var opt = document.createElement("option");
        opt.value = i;
        opt.text = data.weapons[i].name;
        mainWeapon.add(opt);
        if(opt.text == mainSelection)
          mainWeapon.value = i;
        if(data.weapons[i].size != "two"){
          offWeapon.add(opt.cloneNode(true));
          if(opt.text == offSelection)
            offWeapon.value = i;
        }
      }
      //update extra attacks
      var extraContainer = attackForm.getElementsByTagName('div')[0];
      extraContainer.innerHTML = "";
      for( i = 0; i < data.extra.length; i++ ){
        var out = " <input type=\"checkbox\" name=\"extra" + i + "\" " +
          (data.attack[j - 1].extra[i] ? "checked" : "") + "> " + data.extra[i].name;
        extraContainer.innerHTML += out;
      }
      if(extraContainer.innerHTML == "")
        extraContainer.innerHTML = "N/A";
      //update data
      attackForm.onchange();
    }
  }
  
  document.getElementById("exportbtn").onclick = function(){
    document.getElementById("inOutField").value = JSON.stringify(data);
  }
  
  document.getElementById("importbtn").onclick = function(){
    var newData;
    try{
      newData = JSON.parse(document.getElementById("inOutField").value);
    } catch(err){
      return;
    }
    var form = document.getElementById("attack1");
    while(form != null){
      form.elements["remove"].onclick();
      form = document.getElementById("attack1");
    }
    form = document.getElementById("special1");
    while(form != null){
      form.elements["remove"].onclick();
      form = document.getElementById("special1");
    }
    form = document.getElementById("weapon1");
    while(form != null){
      form.elements["remove"].onclick();
      form = document.getElementById("weapon1");
    }
    for(var stat in data.stats){
      if(data.stats.hasOwnProperty(stat)){
        statsTable.deleteRow( document.getElementById( "stat" + stat).rowIndex );
      }
    }
    var j = 0;
    //add weapons from data
    for( j = 0; j < newData.weapons.length; j++ ){
      document.getElementById("addWeapon").onclick();
      var weaponForm = document.getElementById("weapon" + (j+1));
      weaponForm.elements["name"].value = newData.weapons[j].name;
      weaponForm.elements["atk"].value = newData.weapons[j].atk;
      weaponForm.elements["crit"].value = newData.weapons[j].crit;
      weaponForm.elements["base"].value = newData.weapons[j].base;
      weaponForm.elements["bonus"].value = newData.weapons[j].bonus;
      weaponForm.elements["size"].value = newData.weapons[j].size;
      weaponForm.onchange();
    }
    //add extra damage from data
    for( j = 0; j < newData.extra.length; j++ ){
      document.getElementById("addSpecial").onclick();
      var specialForm = document.getElementById("special" + (j+1));
      specialForm.elements["name"].value = newData.extra[j].name;
      specialForm.elements["atk"].value = newData.extra[j].atk;
      specialForm.elements["base"].value = newData.extra[j].base;
      specialForm.elements["crit"].value = newData.extra[j].crit;
      specialForm.elements["addTo"].value = newData.extra[j].addTo;
      specialForm.onchange();
    }
    //add attacks from data
    for( j = 0; j < newData.attack.length; j++ ){
      document.getElementById("addAttack").onclick();
      var attackForm = document.getElementById("attack" + (j+1));
      attackForm.elements["mainWeapon"].value = newData.attack[j].mainWeapon;
      attackForm.elements["offWeapon"].value = newData.attack[j].offWeapon;
      attackForm.elements["crit"].checked = newData.attack[j].crit;
      attackForm.elements["haste"].checked = newData.attack[j].haste;
      attackForm.onchange();
    }
    data = newData;
    //updates extra attacks
    updateAttacks();
    
    i=2;
    for(var stat in data.stats){
      if(data.stats.hasOwnProperty(stat)){
        buildStat(stat, i);
        i++;
      }
    }
    document.getElementById("babBase").value = "+" + data.bab;
    document.getElementById("babTemp").value = ((data.ab - data.bab) >= 0 ? "+" : "") + (data.ab - data.bab);
    document.getElementById("babBase").onchange();
    
    document.getElementById("twfFeat").value = data.twfFeat;
    document.getElementById("critConf").checked = data.conf;
    document.getElementById("confBonus").value = (data.confB >= 0) ? "+" + data.confB : data.confB;
  }
  
  document.getElementById("outClear").onclick = function(){
    var outParent = document.getElementById("output");
    while(outParent.firstChild){
      outParent.removeChild(outParent.firstChild);
    }
    var totalSpace = document.getElementById("outTotal");
    totalSpace.innerText = "";
  }
  
  function rollOnce(atkID){
    var atkData = data.attack[atkID];
    var extras = getExtraIDs(atkID, "first");
    output = [ rollWeaponDamage(atkData.mainWeapon, extras, atkData.haste ? 1 : 0, atkData.crit) ];
    displayRoll(output);
  }
  function rollOnceEach(atkID){
    var atkData = data.attack[atkID];
    if(atkData.offWeapon < 0){
      rollOnce(atkID);
      return;
    }
    var extras = getExtraIDs(atkID, "first");
    var extrasOff = getExtraIDs(atkID, "firstEach");
    var atk = getTwoWeaponAtk(atkID);
    var output = [
      rollWeaponDamage(atkData.mainWeapon, extras, atk[0], atkData.crit),
      rollWeaponDamage(atkData.offWeapon, extrasOff, atk[1], atkData.crit)
    ];
    displayRoll(output);
  }
  function rollFull(atkID){
    var atkData = data.attack[atkID];
    var extras = getExtraIDs(atkID, "first");
    var atk = getTwoWeaponAtk(atkID);
    var output = [];
    
    if(atkData.haste){
      output.push(rollWeaponDamage(atkData.mainWeapon, extras, atk[0], atkData.crit))
      extras = getExtraIDs(atkID, "all");
    }
    for( var j = 0; j < data.atks; j++ ){
      output.push(rollWeaponDamage(atkData.mainWeapon, extras, atk[0] - (j*5), atkData.crit));
      if(j == 0){
        extras = getExtraIDs(atkID, "firstEach");
      }
      if( atkData.offWeapon >= 0 && ( j < data.twfFeat || j == 0 )){
        output.push(rollWeaponDamage(atkData.offWeapon, extras, atk[1] - (j*5), atkData.crit));
      }
      if(j == 0){
        extras = getExtraIDs(atkID, "all");
      }
    }
    displayRoll(output);
  }
  
  function displayRoll(output){
    console.log(output);
    var outDom = document.createElement("p");
    var dmgTotal = 0;
    for( i = 0; i < output.length; i++ ){
      outDom.innerHTML += output[i].output + " : " + output[i].dmg + " dmg";
      if(i+1 < output.length)
        outDom.innerHTML += "<br />";
        
      dmgTotal += output[i].dmg;
    }
    outDom.innerHTML = dmgTotal + " damage<br />" + outDom.innerHTML;
    var outParent = document.getElementById("output");
    if(outParent.childNodes.length < 1){
      outParent.appendChild(outDom);
    } else{
      outParent.insertBefore(outDom, outParent.firstChild);
    }
    var totalSpace = document.getElementById("outTotal");
    var outTotal = totalSpace.innerText;
    outTotal = outTotal == "" ? 0 : parseInt(outTotal.replace("Total - ", ""));
    outTotal += dmgTotal;
    totalSpace.innerText = "Total - " + outTotal; 
  }
  
  function getExtraIDs(atkID, addTo){
    var ids = [];
    for( i = 0; i <  data.extra.length; i++ ){
      if( data.attack[atkID].extra[i] && (data.extra[i].addTo == "all" || (data.extra[i].addTo == "firstEach" && addTo != "all") || data.extra[i].addTo == addTo))
        ids.push(i);
    }
    return ids;
  }
  function getTwoWeaponAtk(atkID){
    var atk = data.attack[atkID].haste? [1,1] : [0,0];
    if(data.attack[atkID].offWeapon < 0)
      return atk;
    
    atk[0] += -6;
    atk[1] += -10;
    if(data.twfFeat > 0){
      atk[0] += 2;
      atk[1] += 6;
    }
    if(data.weapons[data.attack[atkID].offWeapon].size == "light"){
      atk[0] += 2;
      atk[1] += 2;
    }
    return atk;
  }
  
  function rollWeaponDamage( weaponID, extraIds, atkMod, canCrit ){
    var weapon = data.weapons[weaponID];
    //gather attack bonuses
    var attackString = weapon.atk.replace(/\s/g, '');
    //parse and combine 'base' damage
    var baseString = weapon.base.replace(/\s/g, '');
    //parse and combine 'crit' information
    var critString = weapon.crit.replace(/\s/g, '');
    var threatString = critString.split("+")[0];
    critString = critString.replace(threatString, "");
    //parse and combine 'extra' damage (not effected by crit multiplier)
    var bonusString = weapon.bonus.replace(/\s/g, '');
    for(i = 0; i < extraIds.length; i++){
      var extra = data.extra[extraIds[i]];
      attackString += (extra.atk == "" ? "" : "+" + extra.atk.replace(/\s/g, ''));
      critString += (extra.crit == "" ? "" : "+" + extra.crit.replace(/\s/g, ''));
      bonusString += "+" + extra.base.replace(/\s/g, '');
    }
    attackString = attackString.toLowerCase().replace(/-/g, '+-');
    baseString = baseString.toLowerCase().replace(/-/g, '+-');
    critString = critString.toLowerCase().replace(/-/g, '+-');
    bonusString = bonusString.toLowerCase().replace(/-/g, '+-');
    for(var stat in data.stats){
      if(data.stats.hasOwnProperty(stat)){
        var re = new RegExp(stat, 'g');
        attackString = attackString.replace(re, data.stats[stat].mod);
        baseString = baseString.replace(re, data.stats[stat].mod);
        critString = critString.replace(re, data.stats[stat].mod);
        bonusString = bonusString.replace(re, data.stats[stat].mod);
      }
    }
    var rolls = {plus:0, dice:{}, bonus:{}, crit:{}};
    //compile the base data
    var baseSplit = baseString.split("+");
    for( i = 0; i < baseSplit.length; i++ ){
      var b = baseSplit[i];
      if(b == "")
        continue;
      if(b.indexOf("d") < 0){
        rolls.plus += parseInt(eval(b)) || 0;
      }
      else{
        b = b.split("d");
        if(parseInt(b[1])){
          if (typeof rolls.dice["d"+b[1]] === "undefined")
            rolls.dice["d"+b[1]] = 0;
          rolls.dice["d"+b[1]] += parseInt(eval(b[0]) ) || 1;
        }
      }
    }
    //compile the bonus data
    var bonusSplit = bonusString.split("+");
    for( i = 0; i < bonusSplit.length; i++ ){
      var b = bonusSplit[i];
      if(b == "")
        continue;
      if(b.indexOf("d") < 0){
        rolls.plus += parseInt(eval(b)) || 0
      }
      else{
        b = b.split("d");
        if(parseInt(b[1])){
          if (typeof rolls.bonus["d"+b[1]] === "undefined")
            rolls.bonus["d"+b[1]] = 0;
          rolls.bonus["d"+b[1]] += parseInt(eval(b[0]) ) || 1;
        }
      }
    }
    //compile the crit data
    var critSplit = critString.split("+");
    for( i = 0; i < critSplit.length; i++ ){
      var c = critSplit[i];
      if(c == "")
        continue;
      if(c.indexOf("d") < 0){
        rolls.crit["d1"] += parseInt(eval(c)) || 0;
      }
      else{
        c = c.split("d");
        if(parseInt(c[1])){
          if (typeof rolls.crit["d"+c[1]] === "undefined")
            rolls.crit["d"+c[1]] = 0;
          rolls.crit["d"+c[1]] += parseInt(eval(c[0])) || 1;
        }
      }
    }
    //roll the d20s (main and confirm) - determine full value
    var atkRoll = Math.floor((Math.random()*20)+1);
    var confRoll = Math.floor((Math.random()*20)+1);
    //determine final attack bonus - including mod passed to function and BAB
    var fullAtk = atkRoll + atkMod + (parseInt( eval(attackString) ) || 0) + data.ab;
    var fullConf = confRoll + atkMod + (parseInt( eval(attackString) ) || 0) + data.ab + data.confB;
    //determine hit and crit
    var targetAC = parseInt(document.getElementById("targAC").value);
    var isHit = (atkRoll == 20) ? true : ((atkRoll == 1) ? false : fullAtk > targetAC);
    var needConf = data.conf;
    var isThreat, isCrit;
    if(canCrit){
      var threatSplit = threatString.split("x");
      isThreat = (atkRoll == 20) || atkRoll >= ( threatSplit.length < 2 ? 20 : (parseInt(threatSplit[0].split("/")[0].split("-")[0]) || 20) );
      //If you need to confirm the crit -
      if(isThreat && needConf){
        isCrit = confRoll == 20 || (confRoll > 1 && fullConf > targetAC);
      }
      else{
        isCrit = isThreat;
      }
      if(isCrit){
        var critMult = parseInt(threatSplit[threatSplit.length - 1]) || 2;
        applyCrit(rolls.dice, critMult);
        applyCrit(rolls.crit, critMult - 1);
        rolls.plus *= critMult;
      }
    }
    var atkString = "+" + fullAtk + "(" + atkRoll + "+" + (fullAtk - atkRoll);
    if(!isHit){
      return {dmg: 0, output:atkString + ")"};
    }
    if(isThreat && needConf){
      atkString += isCrit ? " [confirmed:" : " [unconfirmed:";
      atkString += fullConf + "(" + confRoll + "+" + (fullConf - confRoll) + ")]";
    }
    atkString += "): ";
    //roll the damage
    rolls = collapseDie(rolls);
    var dmg = rolls.plus, dmgString = "", sides, roll;
    for( var die in rolls.dice ){
      if( rolls.dice.hasOwnProperty(die) ){
        sides = parseInt(die.replace("d",""));
        dmgString += rolls.dice[die] + "d" + sides + "(";
        for( i = 1; i <= rolls.dice[die]; i++ ){
          dmg += roll = Math.floor((Math.random()*sides)+1);
          dmgString += "" + roll;
          if(i < rolls.dice[die])
            dmgString += ","
        }
        dmgString += ") + ";
      }
    }
    dmgString += rolls.plus;
    //return formated damage string
    var outString = atkString + dmgString;
    return {dmg:dmg, output:outString};
  }
  
  function applyCrit(obj, mult){
    for( var die in obj ){
      if(obj.hasOwnProperty(die)){
        obj[die] *= mult;
      }
    }
  }
  
  function collapseDie(rolls){
    var die;
    for( die in rolls.dice ){
      if(rolls.dice.hasOwnProperty(die)){
        if(rolls.bonus.hasOwnProperty(die)){
          rolls.dice[die] += rolls.bonus[die];
          delete rolls.bonus[die];
        }
        if(rolls.crit.hasOwnProperty(die)){
          rolls.dice[die] += rolls.crit[die];
          delete rolls.crit[die];
        }
      }
    }
    for( die in rolls.bonus ){
      if( rolls.bonus.hasOwnProperty(die)){
        rolls.dice[die] = rolls.bonus[die];
        
        if(rolls.crit.hasOwnProperty(die)){
          rolls.dice[die] += rolls.crit[die];
          delete rolls.crit[die];
        }
      }
    }
    delete rolls.bonus;
    for( die in rolls.crit ){
      if( rolls.crit.hasOwnProperty(die) ){
        rolls.dice[die] = rolls.crit[die];
      }
    }
    delete rolls.crit;
    
    if(rolls.dice.hasOwnProperty("d1")){
      rolls.plus += rolls.dice.d1;
      delete rolls.dice.d1;
    }
    
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

    }};