const mysql = require('mysql');
const config = require('../config/mysql');

// 使用配置文件加载
const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

connection.connect();

connection.query('SELECT * FROM colors_table', (err) => {
  if (err) throw err;
});

connection.end();
