const express = require('express');
const app = express();
const port = 3030;

const login = require('./routes/login');
const user = require('./routes/user');
const category = require('./routes/category');
const colors = require('./routes/colors');
const qcategory = require('./routes/Qcategory');
const question = require('./routes/question');

const auth = require('./middleware/auth');
const helmet = require('helmet');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(helmet());
app.use('/login', login);
app.use('/', auth);
app.use('/user', user);
app.use('/category', category);
app.use('/colors', colors);
app.use('/qcategory', qcategory);
app.use('/question', question);

// Client Error Handler
app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ err: '服务器异常' });
  } else {
    next(err);
  }
});

// Error Handle
app.use((err, req, res, next) => {
  res.status(400).json({ message: err.message, code: err.code });
  next();
});

module.exports = app;

app.listen(port);
