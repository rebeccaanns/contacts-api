// const dotenv = require("dotenv");
// dotenv.config();

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gqisnlm.mongodb.net/?retryWrites=true&w=majority";

const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use('/', require('./routes'));

app.listen(port);
console.log('Web Server is listening at port '+ port);