const express = require('express');

const app = require('express').Router();

// LESSON 1 - SEND NAME
// app.get('/', (req, res) => {
//   res.send("Mason Jankiewicz");
// });

app.use('/contacts', require('./contacts'));

module.exports = app;