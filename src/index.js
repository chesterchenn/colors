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

app.use('/fontStyle', fontStyle);
app.use('/category', category);
app.use('/colors', colors);

// Client Error Handler
app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
})

// Error Handle
app.use((err, req, res, next) => {
  res.status(400).json({ message: err.message, code: err.code })
});

app.listen(port);
