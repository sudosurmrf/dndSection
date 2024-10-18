const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const { createServer } = require('./index');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

let app;
let userId;
let token;
let characterId;

beforeAll(async () => {
  app = createServer();
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.userCharacter.deleteMany({});
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('API Routes', () => {
  const userData = {
    username: 'testuser',
    password: 'testpassword',
  };

  test('POST /api/auth/signup - should create a new user', async () => {
    const response = await request(app).post('/api/auth/signup').send(userData);

    // const response = await request(app)
    //   .post('/api/auth/signup')
    //   .set(send(userData));
    //   .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.username).toBe(userData.username);
    userId = response.body.id;
  });

  test.only('POST /api/auth/login - should log in the user', async () => {
    // const fakeToken = jwt.sign({ id: 1 }, 'itsLeviosaaaa');
    // console.log(fakeToken);
    // const tokenString = `Bearer ${fakeToken}`;
    // console.log('this is a tokenString', tokenString);
    const response = await request(app)
      .post('/api/auth/login')
      //   .set('Authorization', tokenString)
      .send(userData);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(userData.username);
    token = response.body.token;
  });

  test('GET /api/auth/me - should return the current user', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(userData.username);
  });

  test('POST /api/characters - should create a new character', async () => {
    const characterData = {
      characterName: 'May',
      characterClass: 'Rogue',
      characterLevel: 5,
      characterImage: 'image',
      strength: 10,
      dexterity: 20,
      constitution: 15,
      intelligence: 10,
      wisdom: 10,
      charisma: 15,
      statusPoints: 5,
      abilities: ['sneak', 'steal', 'stab'],
    };

    const response = await request(app)
      .post('/api/characters')
      .set('Authorization', `Bearer ${token}`)
      .send(characterData);

    expect(response.status).toBe(201);
    expect(response.body.characterName).toBe(characterData.characterName);
    characterId = response.body.id;
  });

  test('GET /api/characters - should return all characters', async () => {
    const response = await request(app)
      .get('/api/characters')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });
});

test('DELETE /api/auth/me - should delete the current user', async () => {
  const response = await request(app)
    .delete('/api/auth/me')
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(204);

  const deletedUser = await prisma.user.findUnique({ where: { id: userId } });
  expect(deletedUser).toBeNull();
});

test('DELETE /api/characters/:id - should delete the character', async () => {
  const response = await request(app)
    .delete(`/api/characters/${characterId}`)
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(204);

  const deletedCharacter = await prisma.userCharacter.findUnique({
    where: { id: characterId },
  });
  expect(deletedCharacter).toBeNull();
});

test('PUT /api/characters/:id - should update the character', async () => {
  const characterData = {
    characterName: 'Updated May',
    characterClass: 'Mage',
    characterLevel: 6,
  };

  const createResponse = await request(app)
    .post('/api/characters')
    .set('Authorization', `Bearer ${token}`)
    .send({
      characterName: 'May',
      characterClass: 'Rogue',
      characterLevel: 5,
      characterImage: 'image',
      strength: 10,
      dexterity: 20,
      constitution: 15,
      intelligence: 10,
      wisdom: 10,
      charisma: 15,
      statusPoints: 5,
      abilities: ['sneak', 'steal', 'stab'],
    });

  characterId = createResponse.body.id;

  const updateResponse = await request(app)
    .put(`/api/characters/${characterId}`)
    .set('Authorization', `Bearer ${token}`)
    .send(characterData);

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.body.characterName).toBe(characterData.characterName);
});

test('GET /api/users - should return all users', async () => {
  const response = await request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

// Error handling tests
test('POST /api/auth/login - should return 401 for invalid credentials', async () => {
  const response = await request(app).post('/api/auth/login').send({
    username: 'wronguser',
    password: 'wrongpassword',
  });
  expect(response.status).toBe(401);
});

test('GET /api/auth/me - should return 401 if not logged in', async () => {
  const response = await request(app).get('/api/auth/me');
  expect(response.status).toBe(401);
});
