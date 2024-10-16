const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/rhnj');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';

const createTables = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS usercharacter;
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL
      dmaccess BOOLEAN DEFAULT FALSE
      adminaccess BOOLEAN DEFAULT FALSE
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE usercharacter(
    id UUID PRIMARY KEY,
    charactername VARCHAR(20) UNIQUE NOT NULL,
    characterclass VARCHAR(20) NOT NULL,
    characterlevel INT NOT NULL,
    characterimage IMAGE NOT NULL,
    user_id UUID REFERENCES users(id),
    strength INT NOT NULL,
    dexterity INT NOT NULL,
    constitution INT NOT NULL,
    intelligence INT NOT NULL,
    wisdom INT NOT NULL,
    charisma INT NOT NULL,
    statuspoints INT NOT NULL,
    abilitities ARRAY NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
    );
  `;
  await client.query(SQL);
};

const createUser = async({ username, password, dmaccess, adminaccess})=> {
    const SQL = `
        INSERT INTO users(id, username, password, dmaccess, adminaccess) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), username, await bcrypt.hash(password, 10)]);
    return response.rows[0];
};

const createCharacter = async({ charactername, characterclass, characterlevel, characterimage, user_id, strength, dexterity, constitution, intelligence, wisdom, charisma, statuspoints, abilitities })=> {
    const SQL = `
        INSERT INTO usercharacter(id, charactername, characterclass, characterlevel, characterimage, user_id, strength, dexterity, constitution, intelligence, wisdom, charisma, statuspoints, abilitities) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), charactername, characterclass, characterlevel, characterimage, user_id, strength, dexterity, constitution, intelligence, wisdom, charisma, statuspoints, abilitities]);
    return response.rows[0];
};



const authenticate = async({ username, password })=> {
    const SQL = `
        SELECT * FROM users WHERE username=$1
    `;
    const response = await client.query(SQL, [username]);
    const user = response.rows[0];
    if(user && await bcrypt.compare(password, user.password)){
        return user;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
};

const createToken = (user)=> {
    return jwt.sign({ id: user.id, username: user.username }, JWT);
}

const verifyToken = (token)=> {
    return jwt.verify(token, JWT);
} 



const destroyUser = async(id)=> {
    const SQL = `
        DELETE FROM users WHERE id=$1
    `;
    await client.query(SQL, [id]);
};

const destroyusercharacter = async(id)=> {
    const SQL = `
        DELETE FROM usercharacter WHERE id=$1
    `;
    await client.query(SQL, [id]);
};

const updateUser = async({ id, username, password })=> {
    const SQL = `
        UPDATE users SET username=$2, password=$3 WHERE id=$1 RETURNING *
    `;
    const response = await client.query(SQL, [id, username, await bcrypt.hash(password, 10)]);
    return response.rows[0];
};

const updateCharacter = async({ id, charactername, characterclass, characterlevel, characterimage, user_id, strength, dexterity, constitution, intelligence, wisdom, charisma, statuspoints, abilitities })=> {
    const SQL = `
        UPDATE usercharacter SET charactername=$2, characterclass=$3, characterlevel=$4, characterimage=$5, user_id=$6, strength=$7, dexterity=$8, constitution=$9, intelligence=$10, wisdom=$11, charisma=$12, statuspoints=$13, abilitities=$14 WHERE id=$1 RETURNING *
    `;
    const response = await client.query(SQL, [id, charactername, characterclass, characterlevel, characterimage, user_id, strength, dexterity, constitution, intelligence, wisdom, charisma, statuspoints, abilitities]);
    return response.rows[0];
};

const fetchUsers = async()=> {
    const SQL = `
        SELECT * FROM users
    `;
    const response = await client.query(SQL);
    return response.rows;
};

const fetchCharacters = async()=> {
    const SQL = `
        SELECT * FROM usercharacter
    `;
    const response = await client.query(SQL);
    return response.rows;
};

const findUserFromToken = async(token)=> {
    try {
        const payload = jwt.verify(token, JWT);
        const SQL = `
            SELECT * FROM users WHERE id=$1
        `;
        const response = await client.query(SQL, [payload.id]);
        return response.rows[0];
    }
    catch(ex){
        const error = Error('bad token');
        error.status = 401;
        throw error;
    }
};

module.exports = {
    client,
    createTables,
    createUser,
    createCharacter,
    authenticate,
    destroyUser,
    destroyusercharacter,
    updateUser,
    updateCharacter,
    fetchUsers,
    fetchCharacters,
    findUserFromToken,
    createToken,
    verifyToken
};
