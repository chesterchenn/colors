/* Example */
const NODE_ENV = process.env.NODE_ENV;
const test = {
  database: 'testdb',
  user: 'user',
  host: '127.0.0.1',
  password: 'passwd',
  timezone: 'Asia/Shanghai',
  privateKey: 'key',
}
const dev = {
  database: 'db',
  user: 'user',
  host: '127.0.0.1',
  password: 'passwd',
  timezone: 'Asia/Shanghai',
  privateKey: 'key',
}
let config = (NODE_ENV && NODE_ENV === 'test') ? test : dev;

module.exports = config;
