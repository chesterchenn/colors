const express = require('express');
const app = express();
const port = 3030;
const mysql = require('mysql');
const config = require('../config/mysql');
const SQL = require('./sql');

// 使用配置文件加载
const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res, next) => {
  connection.connect();
  connection.query(SQL.selectAllFromFont, (err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
    res.send(rows);
  });

  connection.end();
})

app.listen(port);
