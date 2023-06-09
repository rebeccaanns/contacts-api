//some code used from Nathan Birch - https://github.com/byui-cse/cse341-code-student/tree/L02-personal-solution

const {
  response
} = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//GET all contacts
const allContacts = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

//GET single contact
const singleContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find({
        _id: userId
      });

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }

  //   res.send('Contact deleted ' + res.status)
};

//POST - create new contact
const postContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .insertOne(contact);

    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || "An error occured while attempting to create the contact")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}
//PUT - update a contact
const putContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({
        _id: userId
      }, contact);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "An error occured while attempting to update the contact")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

//DELETE contact
const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({
        _id: userId
      }, true);

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "An error occured while attempting to delete the contact")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  allContacts,
  singleContact,
  postContact,
  putContact,
  deleteContact
};
