const express = require('express');
const app = express();
const port = 3030;
const fontStyle = require('./routes/fontStyle');
const category = require('./routes/category');
const colors = require('./routes/colors');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use((err, req, res, next) => {
//   console.log('hello')
//   // res.sendStatus(err.httpStatusCode).json(err);
// });

app.use('/fontStyle', fontStyle);
app.use('/category', category);
app.use('/colors', colors);

app.listen(port);
