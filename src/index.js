const express = require('express');
const app = express();
const port = 3030;
const fontStyle = require('./routes/fontStyle');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/fontStyle', fontStyle);

app.listen(port);
