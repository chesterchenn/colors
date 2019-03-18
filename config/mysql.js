const mysql = require('mysql');

// TODO: 使用配置文件加载
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'chen',
//   password: '1234',
//   database: 'colors'
// });

connection.connect();

connection.query('SELECT * FROM colors_table', (err) => {
  if (err) throw err;
});

connection.end();
