const {
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
    findUserFromToken
} = require
const express = require('express');
const { findUserFromToken } = require('./db');
const app = express();
app.use(express.json());

const isLoggedIn = async(req, res, next)=> {
    try {
      req.user = await findUserByToken(req.headers.authorization);
      next();
    }
    catch(ex){
      next(ex);
    }
  };

  const path = require('path');
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets'))); 

app.post('/api/auth/signup', async(req, res, next)=> {
    try {
        const user = await createUser(req.body);
        res.send(user);
    }
    catch(ex){
        next(ex);
    }
}
);

app.post('/api/auth/login', async(req, res, next)=> {
    try {
        const user = await authenticate(req.body);
        res.send(user);
    }
    catch(ex){
        next(ex);
    }
}
);

app.get('/api/auth/me', isLoggedIn, async(req, res, next)=> {
    res.send(req.user);
}
);

app.delete('/api/auth/me', isLoggedIn, async(req, res, next)=> {
    try {
        await destroyUser(req.user.id);
        res.sendStatus(204);
    }
    catch(ex){
        next(ex);
    }
}
);

app.post('/api/characters', isLoggedIn, async(req, res, next)=> {
    try {
        const character = await createCharacter({ ...req.body, user_id: req.user.id });
        res.send(character);
    }
    catch(ex){
        next(ex);
    }
}
);

app.delete('/api/characters/:id', isLoggedIn, async(req, res, next)=> {
    try {
        await destroyusercharacter(req.params.id);
        res.sendStatus(204);
    }
    catch(ex){
        next(ex);
    }
}
);

app.put('/api/characters/:id', isLoggedIn, async(req, res, next)=> {
    try {
        res.send(await updateCharacter({ ...req.body, id: req.params.id }));
    }
    catch(ex){
        next(ex);
    }
}
);

app.get('/api/users', isLoggedIn, async(req, res, next)=> {
    try {
        res.send(await fetchUsers());
    }
    catch(ex){
        next(ex);
    }
}
);

app.get('/api/characters', isLoggedIn, async(req, res, next)=> {
    try {
        res.send(await fetchCharacters());
    }
    catch(ex){
        next(ex);
    }
}
);

app.use((err, req, res, next)=> {
    console.log(err);
    res.status(500).send({ error: err.message });
}
);

const init = async()=> {
    try {
        await client.connect();
        await createTables();
        console.log('connected to database');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, ()=> {
            console.log(`listening on port ${PORT}`);
        });
    }
    catch(ex){
        console.log(ex);
    }
};

init();
