const { PrismaClient } = require('@prisma/client');
// const { hash } = require('bcrypt');
const express = require('express');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const app = express();
require('dotenv').config();

const init = async () => {
  try {
    // Clear existing data
    await prisma.userCharacter.deleteMany();
    await prisma.user.deleteMany();

    // Create users with hashed passwords
    const users = await Promise.all([
      prisma.user.create({
        data: {
          username: 'admin1',
          password: await bcrypt.hash('testing123', 10),
        },
      }),
      prisma.user.create({
        data: {
          username: 'admin2',
          password: await bcrypt.hash('testing789', 10),
        },
      }),
      prisma.user.create({
        data: {
          username: 'user1',
          password: await bcrypt.hash('getf@cked', 10),
        },
      }),
      prisma.user.create({
        data: {
          username: 'user2',
          password: await bcrypt.hash('likesisters', 10),
        },
      }),
      prisma.user.create({
        data: { username: 'user3', password: await bcrypt.hash('suckit', 10) },
      }),
    ]);
    console.log('Created users:', users);

    // Create characters
    const characters = await Promise.all([
      prisma.userCharacter.create({
        data: {
          characterName: 'May',
          characterClass: 'Rogue',
          characterLevel: 5,
          characterImage: 'image',
          user: { connect: { id: users[2].id } },
          strength: 10,
          dexterity: 20,
          constitution: 15,
          intelligence: 10,
          wisdom: 10,
          charisma: 15,
          statusPoints: 5,
          abilities: ['sneak', 'steal', 'stab'],
        },
      }),
      prisma.userCharacter.create({
        data: {
          characterName: 'Kristen',
          characterClass: 'Wizard',
          characterLevel: 5,
          characterImage: 'image',
          user: { connect: { id: users[4].id } },
          strength: 10,
          dexterity: 10,
          constitution: 10,
          intelligence: 20,
          wisdom: 15,
          charisma: 15,
          statusPoints: 5,
          abilities: ['cast', 'spell', 'fireball'],
        },
      }),
      prisma.userCharacter.create({
        data: {
          characterName: 'Ingrid',
          characterClass: 'Cleric',
          characterLevel: 5,
          characterImage: 'image',
          user: { connect: { id: users[3].id } },
          strength: 10,
          dexterity: 10,
          constitution: 15,
          intelligence: 10,
          wisdom: 20,
          charisma: 15,
          statusPoints: 5,
          abilities: ['heal', 'pray', 'smite'],
        },
      }),
      prisma.userCharacter.create({
        data: {
          characterName: 'Crystal',
          characterClass: 'Fighter',
          characterLevel: 5,
          characterImage: 'image',
          user: { connect: { id: users[2].id } },
          strength: 20,
          dexterity: 10,
          constitution: 15,
          intelligence: 10,
          wisdom: 10,
          charisma: 15,
          statusPoints: 5,
          abilities: ['swing', 'hit', 'block'],
        },
      }),
      prisma.userCharacter.create({
        data: {
          characterName: 'Destinee',
          characterClass: 'Bard',
          characterLevel: 5,
          characterImage: 'image',
          user: { connect: { id: users[1].id } },
          strength: 10,
          dexterity: 10,
          constitution: 15,
          intelligence: 15,
          wisdom: 10,
          charisma: 20,
          statusPoints: 5,
          abilities: ['sing', 'dance', 'charm'],
        },
      }),
    ]);

    console.log('Created characters:', characters);
    console.log('Data seeded');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await prisma.$disconnect();
  }
};

init();
