const express = require('express');

const app = express.Router();

const controller = require('../controllers/contacts');

app.get('/', controller.allContacts);

app.get('/:id', controller.singleContact);

app.post('/', controller.postContact);

app.put('/:id', controller.putContact);

app.delete('/:id', controller.deleteContact);

module.exports = app;
