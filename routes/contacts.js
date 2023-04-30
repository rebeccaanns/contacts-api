const express = require('express');

const app = express.Router();

const controller = require('../controllers/contacts');

app.get('/', controller.allContacts);

app.get('/:Id', controller.singleContact);

module.exports = app;