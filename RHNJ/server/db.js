const { PrismaClient } = require('@prisma/client');
const { hash, compare } = require('../client/node_modules/@types/bcrypt');
const jwt = require('../client/node_modules/@types/jsonwebtoken');

const prisma = new PrismaClient();
const JWT = process.env.JWT_SECRET || 'itsLeviosaaaa';

// Create user
const createUser = async ({
  username,
  password,
  dmAccess = false,
  adminAccess = false,
}) => {
  const hashedPassword = await hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      dmAccess,
      adminAccess,
    },
  });
};

// Create character
const createCharacter = async ({
  characterName,
  characterClass,
  characterLevel,
  characterImage,
  userId,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  statusPoints,
  abilities,
}) => {
  return await prisma.userCharacter.create({
    data: {
      characterName,
      characterClass,
      characterLevel,
      characterImage,
      userId,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      statusPoints,
      abilities,
    },
  });
};

//  Authenticate user
const authenticate = async ({ username, password }) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (user && (await compare(password, user.password))) {
    return user;
  }
  throw new Error('Bad credentials');
};

// Create JWT token
const createToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT);
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, JWT);
};

// Function to delete a user
const destroyUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

// Function to delete character
const destroyUserCharacter = async (id) => {
  return await prisma.userCharacter.delete({
    where: { id },
  });
};

// Function to update user
const updateUser = async ({ id, username, password }) => {
  const data = {
    username,
  };
  if (password) {
    data.password = await hash(password, 10);
  }
  return await prisma.user.update({
    where: { id },
    data,
  });
};

// Function to update character
const updateCharacter = async ({
  id,
  characterName,
  characterClass,
  characterLevel,
  characterImage,
  userId,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  statusPoints,
  abilities,
}) => {
  return await prisma.userCharacter.update({
    where: { id },
    data: {
      characterName,
      characterClass,
      characterLevel,
      characterImage,
      userId,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      statusPoints,
      abilities,
    },
  });
};

// Function to fetch all users
const fetchUsers = async () => {
  return await prisma.user.findMany();
};

// Function to fetch all characters
const fetchCharacters = async () => {
  return await prisma.userCharacter.findMany();
};

// Function to find user from token
const findUserFromToken = async (token) => {
  try {
    const payload = verifyToken(token);
    return await prisma.user.findUnique({ where: { id: payload.id } });
  } catch (ex) {
    throw new Error('Bad token');
  }
};

module.exports = {
  prisma,
  createUser,
  createCharacter,
  authenticate,
  destroyUser,
  destroyUserCharacter,
  updateUser,
  updateCharacter,
  fetchUsers,
  fetchCharacters,
  findUserFromToken,
  createToken,
  verifyToken,
};
