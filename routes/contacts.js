const express = require('express');

const app = express.Router();

const contactsController = require('../controllers/contacts');

app.get('/', contactsController.allContacts);

app.get('/:id', contactsController.singleContact);

module.exports = app;