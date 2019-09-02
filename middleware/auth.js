// jwt
const jwt = require('jsonwebtoken');
const config = require('../config');
const NODE_ENV = process.env.NODE_ENV;
const auth = (req, res, next) => {
  if (NODE_ENV && NODE_ENV.trim() === 'test') {
    return next();
  }
  let token = req.headers["authorization"];
  if (!token) {
    console.log('未登录，无法检测到token');
    return res.status(401).send("未登录");
  }
  try {
    // remove 'Bearer ' from string;
    token = token.slice(7);
    const decode = jwt.verify(token, config.privateKey);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send("token无效");
  }
};

module.exports = auth;
