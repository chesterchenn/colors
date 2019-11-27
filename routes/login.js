/* 登录页面 */
const express = require('express');
const router = express.Router();
const User = require('../db/userSequelize');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config');
const MESSAGE = require('../MESSAGE.json');
const bcrypt = require('bcrypt');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .post((req, res, next) => {
    const body = req.body;
    User.findOne({
      raw: true,
      where: {
        user: body.user,
      }
    }).then(task => {
      bcrypt.compare(body.password, task.password, (err, result) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        if (result) {
          const token = jwt.sign({
            id: task.id,
            user: task.user,
            role: task.role,
          }, config.privateKey);
          res.status(200).send({
            user: task.user,
            role: task.role,
            token,
          });
        }
        if (!result) {
          const err = new Error(MESSAGE.LOGIN_READ_FAILURE_MESSAGE);
          err.code = MESSAGE.LOGIN_READ_FAILURE_CODE;
          console.log(err);
          return next(err)
        }
      })
    }).catch(err => {
      console.log(err);
      err.code = MESSAGE.LOGIN_READ_FAILURE_CODE;
      err.message = MESSAGE.LOGIN_READ_FAILURE_MESSAGE;
      return next(err);
    });
  });

module.exports = router;
