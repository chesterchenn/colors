/* Example */
const NODE_ENV = process.env.NODE_ENV;
let db = (NODE_ENV && NODE_ENV.trim() === 'test') ? 'db_test' : 'db';

module.exports = {
  database: db,
  user: 'user',
  host: '127.0.0.1',
  password: 'password',
  timezone: 'Asia/Shanghai',
  privateKey: 'privateKey',
}
