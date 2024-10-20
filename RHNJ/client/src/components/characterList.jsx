import React, {useState, useEffect} from "react"; 
import aboutCharacter from "./AboutCharacters"; 


const dummyCharacters = [
    { id: 1, 
        class: "The Flirt", 
        description: "The Flirt is the life of the party, always knowing exactly what to say (or sing) to capture attention. This Diva uses her charm, wit, seduction and connections to navigate the social scene, throwing extravagant parties and spreading gossip with finesse. She’s the one who smooths over conflicts—or fans the flames with a sly word—while keeping the spotlight on herself. Known for her performances, whether it’s breaking into song at a dinner party or giving a dramatic toast, she thrives in the limelight.", 
        catchPhrases: [??],
        image: "../../Images/BardImage", 
        strength: 3, 
        dexterity: 2, 
        constitution: 3, 
        intelligence: 3, 
        wisdom: 3, 
        charisma: 1 , 
        savingThrows: [dexterity, charisma], 
        skills: [minorIllusion, viciousMockery, charmPerson, detectMagic, healingWord], 
        singleUseSkill: [thunderwave], 
        hitPoints: ??? },

    { id: 2, 
        class: "The Empath", 
        description: "The Empath is the self-righteous Diva who believes she's the moral compass of the group. She's quick to judge, especially when someone else’s behavior doesn’t align with her version of right and wrong. Constantly preaching about loyalty, family, or faith, she’s often at the center of disputes over values and respect. Whether hosting a charity event or defending her 'sacred' family name, the Empath positions herself as above the petty drama—until she gets dragged into it, of course.", 
        catchPhrases: [??],
        image: "../../Images/ClericImage", 
        strength: 2, 
        dexterity: 3, 
        constitution: 2, 
        intelligence: 3, 
        wisdom: 1, 
        charisma: 3 , 
        savingThrows: [wisdom, charisma], 
        skills: [guidance, mending, bless, healingWord, shieldOfFaith], 
        singleUseSkill: [guidingBolt], 
        hitPoints: ??? },

    { id: 3, 
        class: "The Confronter", 
        description: "The Confronter is the Diva who isn’t afraid to get loud or physical if needed. She’s the one who charges into every confrontation, never backing down from a fight—whether it’s with words or, on rare occasions, a table-flip. She’s fiercely loyal to her friends (as long as they don’t cross her) and is known for settling disputes with a no-nonsense, in-your-face attitude. Direct and fiery, she’s the ultimate force to be reckoned with when things get heated.", 
        catchPhrases: [??],
        image: "../../Images/FighterImage", 
        strength: 1, 
        dexterity: 1, 
        constitution: 2, 
        intelligence: 3, 
        wisdom: 3, 
        charisma: 3 , 
        savingThrows: [strength, charisma], 
        skills: [intimidation, attack, duel, twoHandedWeapon, investigation], 
        singleUseSkill: [actionSurge],
        hitPoints: ??? },

    { id: 4, 
        class: "The Backstabber", 
        description: "The Backstabber is the Diva who thrives on being one step ahead of everyone else, operating from the shadows with subtle schemes. She’s always got something going on behind the scenes—whether it’s a secret alliance, a hidden agenda, or a bit of sabotage to take down a rival. She’s the one to plant seeds of doubt or spread information discreetly, letting others take the fall while she keeps her hands clean. Master of the side-eye and whispered asides, she excels in sneaky maneuvers that others may not even notice until it’s too late.", 
        catchPhrases: [??],
        image: "../../Images/RogueImage", 
        strength: 3, 
        dexterity: 1, 
        constitution: 3, 
        intelligence: 2, 
        wisdom: 3, 
        charisma: 2 , 
        savingThrows: [dexterity, intelligence], 
        skills: [sneakAttack, thevesCant, disguise, cunningAction, sleightOfHand],
        singleUseSkill: [poison],
        hitPoints: ??? },

    { id: 5, 
        class: "The Professional", 
        description: "The Professional is the Diva with the sharpest mind and the most strategic approach to social dominance. She’s always three steps ahead, calculating her every move and often orchestrating drama from behind the scenes. Whether she’s crafting the perfect comeback, planning a power play, or conjuring the ultimate social scheme, she’s the brain behind the group’s most iconic moments. Unlike the Rogue, who operates sneakily, the Wizard’s moves are bold and deliberate, with a clear long-term vision of control.", 
        catchPhrases: [??],
        image: "../../Images/WizardImage", 
        strength: 0, 
        dexterity: 2, 
        constitution: 2, 
        intelligence: 1, 
        wisdom: 0, 
        charisma: 0 , 
        savingThrows: [intelligence, wisdom], 
        skills: [light, mageHand, RayofFrost, charmPerson, shield], 
        singleUseSkill: [magicMissle],
        hitPoints: ??? }
  ];

/* export default function ContactList({ setSelectedContactId }) { 
    const [contacts, setContacts] = useState(dummyContacts);

    useEffect(() => {
        async function fetchContacts() {
          console.log(contacts)
          try {
            const response = await fetch(
              "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users"
            );
            const result = await response.json();
            setContacts(result);
          } catch (error) {
            console.error(error);
          }
        }
        fetchContacts();
      }, []);

    return ( 
        <table>
          <thead>
            <tr>
              <th colSpan="3">Contact List</th>
            </tr>
          </thead>
          <tbody>
          <tr
      onClick={() => {
        setSelectedContactId(contact.id);
      }}
    >
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
            </tr>
            {contacts.map((contact) => {
          return <ContactRow key={contact.id} contact={contact} />;
        })}
          </tbody>
        </table> */
    ); 
}