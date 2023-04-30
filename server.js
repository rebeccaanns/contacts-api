const dotenv = require("dotenv");
dotenv.config();

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gqisnlm.mongodb.net/?retryWrites=true&w=majority";


const express = require('express');
const mongodb = require('./db/connect')
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

app
.use(bodyParser.json())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
.use('/', require('./routes/name.js'));


mongodb.initDb((error, mongodb) => {
    if (error) {
      console.log(error);
    } else {
        app.listen(port);
        console.log('Web Server is listening at port '+ port);
    }
  });