'use strict';

const express = require('express');
const connect = require('./config/mongoose');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// connect to the db
connect()

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', routes);

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);
