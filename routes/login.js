/* 登录页面 */
const express = require('express');
const router = express.Router();
const User = require('../db/userSequelize');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config');
const MESSAGE = require('../MESSAGE.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .post((req, res, next) => {
    const body = req.body;
    User.findOne({
      raw: true,
      where: {
        user: body.user,
        password: body.password,
      }
    }).then(task => {
      const token = jwt.sign({
        id: task.id,
        user: task.user,
        role: task.role,
      }, config.privateKey);
      res.status(200).send({
        token,
      });
    }).catch(error => {
      console.log(error);
      error.code = MESSAGE.LOGIN_READ_FAILURE_CODE;
      error.message = MESSAGE.LOGIN_READ_FAILURE_MESSAGE;
      return next(error);
    });
  });

module.exports = router;
