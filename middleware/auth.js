// jwt
const jwt = require('jsonwebtoken');
const config = require('../config');
const NODE_ENV = process.env.NODE_ENV;
const MESSAGE = require('../MESSAGE.json');

const auth = (req, res, next) => {
  if (NODE_ENV && NODE_ENV === 'test') {
    return next();
  }
  let token = req.headers["authorization"];
  if (!token) {
    console.log(MESSAGE.AUTH_NO_TOKEN_MESSAGE);
    return res.status(401).send({
      code: MESSAGE.AUTH_NO_TOKEN_CODE,
      message: MESSAGE.AUTH_NO_TOKEN_MESSAGE,
    });
  }
  try {
    // remove 'Bearer ' from string;
    token = token.slice(7);
    const decode = jwt.verify(token, config.privateKey);
    req.user = decode;
    next();
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      code: MESSAGE.AUTH_INVALID_TOKEN_CODE,
      message: MESSAGE.AUTH_INVALID_TOKEN_MESSAGE,
    });
  }
};

module.exports = auth;
