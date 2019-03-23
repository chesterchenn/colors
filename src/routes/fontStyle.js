const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const fontStyleSql = require('../db/fontStyleSql');
const config = require('../../config/mysql');

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

router.get('/', (req, res, next) => {
  connection.connect();
  connection.query(fontStyleSql.selectAllFromFontStyle, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    res.send(rows);
  });

  connection.end();
})

module.exports = router;
