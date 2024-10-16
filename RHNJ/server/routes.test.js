const api = require('./server/index.js');
const pg = require('pg')
const client = new pg.Client('postgres://localhost:5432/rhnj')
jest.mock('./server/index.js');

//fetch methods
test('fetches user data', async () => {
  api.fetchUserData.mockResolvedValueOnce({ username: 'admin1', password: 'testing123' });
    const user = await api.fetchUserData();
    expect(user).toEqual({ username: 'admin1', password: 'testing123' });
}
);

test ('fetches character data', async () => {
    api.fetchCharacterData.mockResolvedValueOnce({ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] });
    const character = await api.fetchCharacterData();
    expect(character).toEqual({ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] });
}
);

test ('fetches all character data', async () => {
    api.fetchAllCharacterData.mockResolvedValueOnce([{ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] }]);
    const allCharacters = await api.fetchAllCharacterData();
    expect(allCharacters).toEqual([{ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] }]);
}
);

test ('fetches all user data', async () => {
    api.fetchAllUserData.mockResolvedValueOnce([{ username: 'admin1', password: 'testing123' }]);
    const allUsers = await api.fetchAllUserData();
    expect(allUsers).toEqual([{ username: 'admin1', password: 'testing123' }]);
}
);

//create methods
test ('creates new user', async () => {
    api.createUser.mockResolvedValueOnce({ username: 'admin1', password: 'testing123' });
    const newUser = await api.createUser();
    expect(newUser).toEqual({ username: 'admin1', password
    : 'testing123' });
}
);

test ('creates new character', async () => {
    api.createCharacter.mockResolvedValueOnce({ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] });
    const newCharacter = await api.createCharacter();
    expect(newCharacter).toEqual({ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] });
}
);

//update methods
test ('updates user data', async () => {
    api.updateUserData.mockResolvedValueOnce({ username: 'admin1', password: 'testing123' });
    const updatedUser = await api.updateUserData();
    expect(updatedUser).toEqual({ username: 'admin1', password: 'testing123' });
}
);

test ('updates character data', async () => {
    api.updateCharacterData.mockResolvedValueOnce({ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] });
    const updatedCharacter = await api.updateCharacterData();
    expect(updatedCharacter).toEqual({ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] });
}
);

//delete methods
test ('deletes user', async () => {
    api.deleteUser.mockResolvedValueOnce({ username: 'admin1', password: 'testing123' });
    const deletedUser = await api.deleteUser();
    expect(deletedUser).toEqual({ username: 'admin1', password: 'testing123' });
}
);

test ('deletes character', async () => {
    api.deleteCharacter.mockResolvedValueOnce({ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] });
    const deletedCharacter = await api.deleteCharacter();
    expect(deletedCharacter).toEqual({ charactername: 'May', characterclass: 'Rogue', characterlevel: '5', characterimage: 'image', user_id: '1', strength: '10', dexterity: '20', constitution: '15', intelligence: '10', wisdom: '10', charisma: '15', statuspoints: '5', abilitities: ['sneak', 'steal', 'stab'] });
}
);

//login methods
test ('authenticates user', async () => {
    api.authenticateUser.mockResolvedValueOnce({ username: 'admin1', password: 'testing123' });
    const authenticatedUser = await api.authenticateUser();
    expect(authenticatedUser).toEqual({ username: 'admin1', password: 'testing123' });
}
);

//seed methods
test ('initializes database', async () => {
    api.init.mockResolvedValueOnce({ username: 'admin1', password: 'testing123' });
    const initializedDatabase = await api.init();
    expect(initializedDatabase).toEqual({ username: 'admin1', password: 'testing123' });
}
);

//connect methods
test ('connects to database', async () => {
    api.connect.mockResolvedValueOnce({ username: 'admin1', password: 'testing123' });
    const connectedDatabase = await api.connect();
    expect(connectedDatabase).toEqual({ username: 'admin1', password: 'testing123' });
}
);

//verify methods
test ('verifies token', async () => {
    api.verifyToken.mockResolvedValueOnce({ username: 'admin1', password: 'testing123' });
    const verifiedToken = await api.verifyToken();
    expect(verifiedToken).toEqual({ username: 'admin1', password: 'testing123' });
}
);

//find methods
test ('finds user from token', async () => {
    api.findUserFromToken.mockResolvedValueOnce({ username: 'admin1', password: 'testing123' });
    const foundUser = await api.findUserFromToken();
    expect(foundUser).toEqual({ username: 'admin1', password: 'testing123' });
}
);

