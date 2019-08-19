const express = require('express');
const app = express();
const port = 3030;
const login = require('./routes/login');
const user = require('./routes/user');
const category = require('./routes/category');
const colors = require('./routes/colors');
const jwt = require('jsonwebtoken');
const config = require('./config');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use((req, res, next) => {
//   if (req.baseUrl !== 'login') {
//     const token =  req.headers["authorization"];
//     if (!token) return res.status(401).send("未提供Token.");
//     try {
//       console.log(token);
//       const decode = jwt.verify(token, config.privateKey);
//       req.user = decode;
//       next();
//     } catch (err) {
//       res.status(400).send("无效的Token.");
//     }
//   }
// });

app.use('/login', login);
app.use('/user', user);
app.use('/category', category);
app.use('/colors', colors);

// Client Error Handler
app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: '服务器异常' });
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
