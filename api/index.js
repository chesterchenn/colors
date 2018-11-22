const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.end('Hello World'));

app.route('/colors')
  .get((req, res) => {
    res.send(fs.readFileSync('../config/colors.json', 'utf8'))
    res.end();
  })

app.listen(port);