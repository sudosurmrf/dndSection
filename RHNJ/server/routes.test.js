const api = require('./server/index.js');
const pg = require('pg')
const client = new pg.Client('postgres://localhost:5432/rhnj')
jest.mock('./server/index.js');

