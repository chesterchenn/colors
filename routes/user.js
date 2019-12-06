/* 用户管理页面 */
const express = require('express');
const router = express.Router();
const User = require('../db/userSequelize');
const MESSAGE = require('../MESSAGE.json');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const checkRole = require('../middleware/checkRole');
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use('/', checkRole);

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
          .then(task => {
            const plainTask = task.get({
              plain: true,
            });
            // eslint-disable-next-line
            const { password, ...result } = plainTask;
            res.status(200).send({
              code: MESSAGE.USER_ADD_SUCCESS_CODE,
              message: MESSAGE.USER_ADD_SUCCESS_MESSAGE,
              list: [result],
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

router.route('/:id')
  .put((req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    if (!body.oldPassword) {
      const err = new Error(MESSAGE.USER_UPDATE_OLD_PASSWD_MESSAGE);
      err.code = MESSAGE.USER_UPDATE_OLD_PASSWD_CODE;
      console.error(err);
      return next(err);
    }
    if (!body.password) {
      const err = new Error(MESSAGE.USER_UPDATE_NEW_PASSWD_MESSAGE);
      err.code = MESSAGE.USER_UPDATE_NEW_PASSWD_CODE;
      console.error(err);
      return next(err);
    }
    if (body.password.length < 6) {
      const err = new Error(MESSAGE.USER_UPDATE_NEW_PASSWD_LENGTH_MESSAGE);
      err.code = MESSAGE.USER_UPDATE_NEW_PASSWD_LENGTH_CODE;
      console.error(err);
      return next(err);
    }
    if (body.password !== body.confirmPassword) {
      const err = new Error(MESSAGE.USER_UPDATE_NEW_PASSWD_DIFF_MESSAGE);
      err.code = MESSAGE.USER_UPDATE_NEW_PASSWD_DIFF_CODE;
      console.error(err);
      return next(err);
    }
    User.findByPk(id).then(task => {
      if (!task) {
        const err = new Error(MESSAGE.USER_UPDATE_USER_NO_EXIST_MESSAGE);
        err.code = MESSAGE.USER_UPDATE_USER_NO_EXIST_CODE;
        console.error(err);
        return next(err);
      }
      bcrypt.compare(body.oldPassword, task.password, (err, result) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (result) {
          bcrypt.hash(body.password, saltRounds, function(err, hash) {
            User.update({ password: hash, }, { where: { id, }})
              .then(() => {
                res.status(200).send({
                  code: MESSAGE.USER_UPDATE_SUCCESS_CODE,
                  message: MESSAGE.USER_UPDATE_SUCCESS_MESSAGE,
                });
              })
              .catch(err => {
                console.error(err);
                err.message = MESSAGE.USER_UPDATE_FAILURE_MESSAGE;
                err.code = MESSAGE.USER_UPDATE_FAILURE_CODE;
                return next(err);
              });
          });
        }
        if (!result) {
          const err = new Error(MESSAGE.USER_UPDATE_OLD_PASSWD_COMPARE_MESSAGE);
          err.code = MESSAGE.USER_UPDATE_OLD_PASSWD_COMPARE_CODE;
          console.error(err);
          return next(err);
        }
      });
    });
  })
  .delete((req, res, next) => {
    const id = req.params.id;
    User.findByPk(id).then(result => {
      if (!result) {
        const err = new Error(MESSAGE.USER_DELETE_ID_MESSAGE);
        err.code = MESSAGE.USER_DELETE_ID_CODE;
        return next(err);
      }
      User.destroy({
        where: { id, }
      })
        .then(() => {
          res.status(200).send({
            message: MESSAGE.USER_DELETE_SUCCESS_MESSAGE,
            code: MESSAGE.USER_DELETE_SUCCESS_CODE,
          });
        })
        .catch(err => {
          console.error(err);
          err.code = MESSAGE.USER_DELETE_FAILURE_CODE;
          err.message = MESSAGE.USER_DELETE_FAILURE_MESSAGE;
          return next(err);
        });
    });
  });

module.exports = router;
