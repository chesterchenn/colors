const express = require('express');
const fs = require('fs');
const app = express();
const port = 3030;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/api/name', (req, res) => {
  res.send('chesterchenn');
  res.end();
});

app.route('/api/colors')
  .get((req, res) => {
    res.send(fs.readFileSync('../config/colors.json', 'utf8'))
    res.end();
  })

app.listen(port);