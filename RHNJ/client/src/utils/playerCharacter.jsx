import React from "react"; 
/*from https://codepen.io/pineapplechunk/pen/AoegBq */

export default function playerCharacter({ }) {
    return (
      <>
      <div>
      <div class='wrapper'>
  <div id="tab1" class="tab active">
    <div id="bt1" class="button selected"></div>
    <form id='charinfo'>
      <fieldset id='basic'>
        <legend>Basic Info</legend><br/>
        <label>Character Name:</label> <input type='text' name='charname'/><br/>
        <label>Class / Level:</label> <input type='text' name='lvl'/><br/>
        </fieldset>
        <fieldset id='stats'>
          <legend>Stats</legend><br/>
          <table>
            <tr class='table-header'>
              <td><h2>Score</h2></td>
              <td><h2>Modifier</h2></td>
            </tr>
            <tr>
              <td><label>STR</label> <input type='text' class="small" name='str'/></td>
                <td><input type='text' class='small' value='' name= 'strmod'/></td>
              </tr>
              <tr>
                <td><label>DEX</label> <input type='text' class="small" name='dex'/></td>
                  <td><input type='text' class='small' name='dexmod'/></td>
                </tr>
                tr>
                <td><label>CON</label> <input type='text' class="small" name='dex'></td>
                  <td><input type='text' class='small' name='dexmod'></td>
                </tr>
                <tr>
                  <td><label>INT</label> <input type='text' class="small" name='int'></td>
                    <td><input type='text' class='small' name='intmod'></td>
                  </tr>
            <tr>
              <td><label>WIS</label> <input type='text' class="small" name='wis'></td>
                <td><input type='text' class='small' name='wismod'></td>
              </tr>
            <tr>
              <td><label>CHA</label> <input type='text' class="small" name='cha'></td>
                <td><input type='text' class='small' name='chamod'></td>
                </tr>
           </table>
          </fieldset>
    </form>
              <form id='combatinfo'>
                 <fieldset id="saves">
            <legend>Combat Information</legend><br/>
            Armor Class: <input type='text' class="small" name='ac'><br/>
                <legend>Saves</legend><br/>
                <table>
                 <tr>
                   <td><label>Reflex:</label> <input type='text' class="small" name='ref'><br/></td>
                                          <td><input type='text' class="small" name='refbase'></td>
                       <td><input type='text' class="small" name='refabil'></td>
                         <td><input type='text' class="small" name='refmagic'></td>
                           <td><input type='text' class="small" name='refmisc'></td>
                   </tr>
            <tr>
              <td><label>Will:</label> <input type='text' class="small" name='will'><br/></td>
                                     <td><input type='text' class="small" name='willbase'></td>
                       <td><input type='text' class="small" name='willabil'></td>
                         <td><input type='text' class="small" name='willmagic'></td>
                           <td><input type='text' class="small" name='willmisc'></td>
             </tr>
              <tr>
                <td><label>Fortitude:</label> <input type='text' class="small" name='fort'><br/></td>
                                       <td><input type='text' class="small" name='fortbase'></td>
                       <td><input type='text' class="small" name='fortabil'></td>
                         <td><input type='text' class="small" name='fortmagic'></td>
                           <td><input type='text' class="small" name='fortmisc'></td>
             </tr>
               </table>
               </fieldset>
                </form>
  </div>
  <div id="tab2" class="tab"><div id="bt2" class="button"></div><h1>Tab 2</h1></div>
  <div id="tab3" class="tab"><div id="bt3" class="button"></div><h1>Tab 3</h1></div>
</div>
      </>
    );
  }