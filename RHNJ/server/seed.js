const { createCharacter, createUser } = require("./db");

const init = async()=> {
    try {
    await client.connect();
    console.log('connected to database');
    await createTables();
    console.log('tables created');

    // user buildout
    const [admin1, admin2, user1, user2, user3] = await Promise.all([
      createUser({ username: 'admin1', password: 'testing123' }),
        createUser({ username: 'admin2', password: 'testing789' }),
        createUser({ username: 'user1', password: 'getf@cked' }),
        createUser({ username: 'user2', password: 'likesisters' }),
        createUser({ username: 'user3', password: 'suckit' })
      
    ]);
    //character buildout
    const [destinee, kristen, crystal, may, ingrid] = await Promise.all([   
        createCharacter({ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: user1.id, strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] }),
        createCharacter({ charactername: 'Kristen', characterclass: 'Wizard', characterlevel: '5', characterimage: 'image', user_id: user3.id, strength: '10', dexterity: '10', constitution: '10', intelligence: '20', wisdom: '15', charisma: '15', statuspoints: '5', abilitities: ['cast', 'spell', 'fireball'] }),
        createCharacter({ charactername: 'Ingrid', characterclass: 'Cleric', characterlevel: '5', characterimage: 'image', user_id: user2.id, strength: '10', dexterity: '10', constitution: '15', intelligence: '10', wisdom: '20', charisma: '15', statuspoints: '5', abilitities: ['heal', 'pray', 'smite'] }),
        createCharacter({ charactername: 'Crystal', characterclass: 'Fighter', characterlevel: '5', characterimage: 'image', user_id: user1.id, strength: '20', dexterity: '10', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['swing', 'hit', 'block'] }),
        createCharacter({ charactername: 'Destinee', characterclass: 'Bard', characterlevel: '5', characterimage: 'image', user_id: user2.id, strength: '10', dexterity: '10', constitution: '15', intelligence: '15', wisdom: '10', charisma: '20', statuspoints: '5', abilitities: ['sing', 'dance', 'charm'] })
      
    ]);
      
      console.log('Data seeded');
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error during initialization:', err);
  }
  };

init();
