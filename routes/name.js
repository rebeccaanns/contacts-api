const express = require('express');
const contacts = require('./contacts');

const app = express.Router();

// LESSON 1 - SEND NAME
// app.get('/', (req, res) => {
//   res.send("Mason Jankiewicz");
// });

app
  .use('/contacts', require('./contacts'))
  .use('/', require('./swagger'));

module.exports = app;
