'use strict';

const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);
