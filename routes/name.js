const app = require('express').Router();

app.get('/', (req, res) => {
  res.send("Mason Jankiewicz");
});

module.exports = app;