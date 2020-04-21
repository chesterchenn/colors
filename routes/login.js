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

/**
 * @api {post} /login login
 * @apiName login
 * @apiGroup Login
 *
 * @apiParam {String} user user name
 * @apiParam {String} password user password
 *
 * @apiSuccess {String} code code of the response.
 * @apiSuccess {String} message message of the response.
 * @apiSuccess {String} user user of the user.
 * @apiSuccess {Number} role role of the user.
 * @apiSuccess {String} token token of the user.
 *
 * @apiError  {String} code code of the Error.
 * @apiError  {String} message message of the Error.
 */
router.route('/')
  .post((req, res, next) => {
    const user = req.body.user;
    const password = req.body.password;
    User.findOne({
      raw: true,
      where: { user, }
    }).then(task => {
      bcrypt.compare(password, task.password, (err, result) => {
        if (err) {
          console.error(err);
          err.message = MESSAGE.LOGIN_READ_FAILURE_MESSAGE;
          err.code = MESSAGE.LOGIN_READ_FAILURE_CODE;
          return next(err);
        }
        if (result) {
          const token = jwt.sign({
            id: task.id,
            user: task.user,
            role: task.role,
          }, config.privateKey);
          res.status(200).send({
            code: MESSAGE.LOGIN_READ_SUCCESS_CODE,
            message: MESSAGE.LOGIN_READ_SUCCESS_MESSAGE,
            user: task.user,
            role: task.role,
            token,
          });
        }
        if (!result) {
          const err = new Error(MESSAGE.LOGIN_READ_FAILURE_MESSAGE);
          err.code = MESSAGE.LOGIN_READ_FAILURE_CODE;
          console.error(err);
          return next(err);
        }
      });
    }).catch(err => {
      console.error(err);
      err.code = MESSAGE.LOGIN_READ_FAILURE_CODE;
      err.message = MESSAGE.LOGIN_READ_FAILURE_MESSAGE;
      return next(err);
    });
  });

module.exports = router;
