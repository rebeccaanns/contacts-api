//some code used from Nathan Birch - https://github.com/byui-cse/cse341-code-student/tree/L02-personal-solution

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const allContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const singleContact = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .find({_id: userId});

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

module.exports = {
    allContacts, singleContact
};