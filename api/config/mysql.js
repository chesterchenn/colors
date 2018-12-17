const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'chen',
  password: '1234',
  database: 'colors'
});

connection.connect();

connection.query('SELECT * FROM colors_table', (err, rows, fields) => {
  console.log('Hello');
})

connection.end();