/* 用户管理页面 */
const express = require('express');
const router = express.Router();
const User = require('../db/userSequelize');
const MESSAGE = require('../MESSAGE.json');

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
  });

module.exports = router;
