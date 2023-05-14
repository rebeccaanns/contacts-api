const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const mongodb = require('./db/connect')
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');


const app = express();
const port = process.env.port || 3000;

app
  .use(bodyParser.json())
  .use(cors())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes/name.js'));


mongodb.initDb((error, mongodb) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(port);
    console.log('Web Server is listening at port ' + port);
  }
});
