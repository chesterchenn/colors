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
    }).catch(error => {
      console.error(error);
      error.code = USER.CATEGORY_READ_FAILURE_CODE;
      error.message = USER.CATEGORY_READ_FAILURE_CODE;
      return next(error);
    });
  })
  .post((req, res, next) => {
    const body = req.body;
    const role = req.role || 2;
    if (!body.user) {
      const error = new Error('用户不能为空');
      return next(error);
    }
    if (!body.password) {
      const error = new Error('密码不能为空');
      return next(error);
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
              code: '创建用户成功',
              message: '创建用户成功',
            });
          })
          .catch(error => {
            next(error);
          });
      });
    });
  });

module.exports = router;
