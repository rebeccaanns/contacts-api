const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const mongodb = require('./db/connect')
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
const port = process.env.port || 3000;

app
  .use(bodyParser.json())
  // .use(cors())
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
    console.log('Web Server is listening at port ' + port);
  }
});
