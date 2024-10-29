import React from "react"; 

export default function characterBuilder({class, description, catchPhrases, image, strength, dexterity, constitution, intelligence, wisdom, charisma, savingThrows, skills, singleUseSkill, hitPoints, attackRoll}) {
if (!class) {
    return <div>No character selected</div>;
  }
  

    return (
      <div>
<h1>Build Your Character</h1>
        <h2>{class}</h2>
        <img src={image} alt={class} />
        <p>{description}</p>
        <h3>Stats</h3>
        <ul>
          <li>Strength: {strength}</li>
          <li>Dexterity: {dexterity}</li>
          <li>Constitution: {constitution}</li>
          <li>Intelligence: {intelligence}</li>
          <li>Wisdom: {wisdom}</li>
          <li>Charisma: {charisma}</li>
        </ul>
        <h3>Saving Throws</h3>
        <ul>
          {savingThrows.map((save) => (
            <li key={save}>{save}</li>
          ))}
        </ul>
        <h3>Skills</h3>
        <ul>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <h3>Single-Use Skills</h3>
        <ul>
          {singleUseSkill.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <h3>Hit Points</h3>
        <p>{hitPoints}</p>
        <h3>Attack Roll</h3>
        <p>{attackRoll}</p>
        <h3>Catch Phrases</h3>
        <ul>
          {catchPhrases.map((phrase) => (
            <li key={phrase}>{phrase}</li>
          ))}
        </ul>


</div>
    );
  }