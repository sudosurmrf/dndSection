const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// async function isCorrectJWTToken(req, res, next) {
//   try {
//     if (await jwt.verify(req.headers.authorization, SECRET_KEY)) {
//       next();
//     }
//   } catch (err) {
//     res.status(401).send('Unauthorized');
//   }
// }

// Middlewareß
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send({ error: 'Unauthorized' });
    console.log('testing jwt secret', process.env.JWT_SECRET);
    console.log('testing token value', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(401).send({ error: 'Unauthorized' });

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error('JWT Error:', error);
      return res.status(401).send({ error: 'Invalid token' });
    }
    next(error);
  }
};

function createServer() {
  return app;
}

// Sign-up
app.post('/api/auth/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    await client.query(
      'INSERT INTO users (id, name, password,token) VALUES ($1, $2, $3, $4)',
      [id, name, hashedPassword, token]
    );
    res.json('user created');

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

// User login
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

app.get('/api/auth/me', isLoggedIn, (req, res) => {
  res.send(req.user);
});

app.delete('/api/auth/me', isLoggedIn, async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Character routes
app.post('/api/characters', isLoggedIn, async (req, res, next) => {
  try {
    const {
      characterName,
      characterClass,
      characterLevel,
      characterImage,
      ...stats
    } = req.body;
    const character = await prisma.userCharacter.create({
      data: {
        characterName,
        characterClass,
        characterLevel,
        characterImage,
        userId: req.user.id,
        ...stats,
      },
    });
    res.status(201).send(character);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/characters/:id', isLoggedIn, async (req, res, next) => {
  try {
    await prisma.userCharacter.delete({ where: { id: Number(req.params.id) } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.put('/api/characters/:id', isLoggedIn, async (req, res, next) => {
  try {
    const updatedCharacter = await prisma.userCharacter.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.send(updatedCharacter);
  } catch (error) {
    next(error);
  }
});

app.get('/api/users', isLoggedIn, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

app.get('/api/characters', isLoggedIn, async (req, res, next) => {
  try {
    const characters = await prisma.userCharacter.findMany({
      where: { userId: req.user.id },
    });
    res.send(characters);
  } catch (error) {
    next(error);
  }
});

// Middleware error handling
app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).send({ error: 'Invalid token' });
  }

  res.status(500).send({ error: err.message });
});

// Initialize server and connect to database
const init = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to database');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

init();
module.exports = { createServer };
