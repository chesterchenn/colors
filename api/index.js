const express = require('express');
const fs = require('fs');
const app = express();
const port = 3030;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const db = fs.readFileSync('../config/db.json', 'utf8');
const data = JSON.parse(db);

app.route('/api/db')
  .get((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
    res.end();
  })

app.route('/api/db/colors')
  .get((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data.colors);
    res.end();
  })

app.listen(port);