/* 用户管理页面 */
const express = require('express');
const router = express.Router();
const User = require('../db/userSequelize');
const MESSAGE = require('../MESSAGE.json');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .get((req, res, next) => {
    const current = ~~req.query.current || 1;
    const perPage = ~~req.query.perPage || 10;
    User.findAndCountAll({
      limit: perPage,
      offset: (current - 1) * perPage,
      raw: true,
      attributes: { exclude: ['password'] },
    }).then(result => {
      res.status(200).send({
        code: MESSAGE.USER_READ_SUCCESS_CODE,
        message: MESSAGE.USER_READ_SUCCESS_MESSAGE,
        current,
        perPage,
        count: result.count,
        list: result.rows,
      });
    }).catch(err => {
      console.error(err);
      err.code = USER.CATEGORY_READ_FAILURE_CODE;
      err.message = USER.CATEGORY_READ_FAILURE_CODE;
      return next(err);
    });
  })

  .post((req, res, next) => {
    const body = req.body;
    const role = req.role;
    if (!body.user) {
      const err = new Error(MESSAGE.USER_ADD_NO_USER_MESSAGE);
      err.code = MESSAGE.USER_ADD_NO_USER_CODE;
      return next(err);
    }
    if (!body.password) {
      const err = new Error(MESSAGE.USER_ADD_NO_PASSWD_MESSAGE);
      err.code = MESSAGE.USER_ADD_NO_PASSWD_CODE;
      return next(err);
    }
    if (body.password.length < 6) {
      const err = new Error(MESSAGE.USER_ADD_PASSWD_LENGTH_MESSAGE);
      err.code = MESSAGE.USER_ADD_PASSWD_LENGTH_CODE;
      return next(err);
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(body.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        User.create({
          user: body.user,
          password: hash,
          role: role,
        })
          .then(() => {
            res.status(200).send({
              code: MESSAGE.USER_ADD_SUCCESS_CODE,
              message: MESSAGE.USER_ADD_SUCCESS_MESSAGE,
            });
          })
          .catch(err => {
            console.error(err);
            if (err.errors[0].type === 'unique violation' && err.errors[0].path === 'user') {
              err.code = MESSAGE.USER_ADD_USER_EXIST_CODE;
              err.message = MESSAGE.USER_ADD_USER_EXIST_MESSAGE;
              return next(err);
            }
            err.code = MESSAGE.USER_ADD_FAILURE_CODE;
            err.message = MESSAGE.USER_ADD_FAILURE_MESSAGE;
            return next(err);
          });
      });
    });
  });

module.exports = router;
