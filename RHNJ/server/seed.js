const { PrismaClient } = require('@prisma/client');
const { hash } = require('../client/node_modules/@types/bcrypt');
const express = require('../client/node_modules/@types/express');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const app = express();

const init = async () => {
  try {
    // Clear existing data
    await prisma.userCharacter.deleteMany();
    await prisma.user.deleteMany();

    // Create users with hashed passwords
    const users = await Promise.all([
      prisma.user.create({
        data: { username: 'admin1', password: await hash('testing123', 10) },
      }),
      prisma.user.create({
        data: { username: 'admin2', password: await hash('testing789', 10) },
      }),
      prisma.user.create({
        data: { username: 'user1', password: await hash('getf@cked', 10) },
      }),
      prisma.user.create({
        data: { username: 'user2', password: await hash('likesisters', 10) },
      }),
      prisma.user.create({
        data: { username: 'user3', password: await hash('suckit', 10) },
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

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error during initialization:', err);
  } finally {
    await prisma.$disconnect();
  }
};

init();
