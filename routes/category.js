/* 颜色分类页面 */
const express = require('express');
const router = express.Router();
const Category = require('../db/categorySequelize');
const bodyParser = require('body-parser');
const MESSAGE = require('../MESSAGE.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')

  // get category list
  .get((req, res, next) => {
    const current = ~~req.query.current || 1;
    const perPage = ~~req.query.perPage || 10;
    Category.findAndCountAll({
      limit: perPage,
      offset: (current - 1) * perPage,
      raw: true,
    }).then(result => {
      res.status(200).send({
        code: MESSAGE.CATEGORY_READ_SUCCESS_CODE,
        message: MESSAGE.CATEGORY_READ_SUCCESS_MESSAGE,
        current,
        perPage,
        count: result.count,
        list: result.rows,
      });
    }).catch(err => {
      console.error(err);
      err.code = MESSAGE.CATEGORY_READ_FAILURE_CODE;
      err.message = MESSAGE.CATEGORY_READ_FAILURE_CODE;
      return next(err);
    });
  })

  // Add a category
  .post((req, res, next) => {
    const body = req.body;
    if (!body.name) {
      const err = new Error(MESSAGE.CATEGORY_ADD_NAME_MESSAGE);
      err.code = MESSAGE.CATEGORY_ADD_NAME_CODE;
      return next(err);
    }
    if (!body.cname) {
      const err = new Error(MESSAGE.CATEGORY_ADD_CNAME_MESSAGE);
      err.code = MESSAGE.CATEGORY_ADD_CNAME_CODE;
      return next(err);
    }
    Category.create({
      name: body.name,
      cname: body.cname,
    })
      .then(task => {
        const plainTask = task.get({
          plain: true
        });
        res.status(200).send({
          code: MESSAGE.CATEGORY_ADD_SUCCESS_CODE,
          message: MESSAGE.CATEGORY_ADD_SUCCESS_MESSAGE,
          list: [plainTask],
        });
      })
      .catch(err => {
        console.error(err);
        err.code = MESSAGE.CATEGORY_ADD_FAILURE_CODE;
        err.message = MESSAGE.CATEGORY_ADD_FAILURE_MESSAGE;
        return next(err);
      });
  });

router.route('/:id')
  // Update a category
  .put((req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Category.findByPk(id).then(result => {
      if (result === null) {
        const err = new Error(MESSAGE.CATEGORY_UPDATE_ID_MESSAGE);
        err.code = MESSAGE.CATEGORY_UPDATE_ID_CODE;
        return next(err);
      }
      if (!body.name) {
        const err = new Error(MESSAGE.CATEGORY_UPDATE_NAME_MESSAGE);
        err.code = MESSAGE.CATEGORY_UPDATE_NAME_CODE;
        return next(err);
      }
      if (!body.cname) {
        const err = new Error(MESSAGE.CATEGORY_UPDATE_CNAME_MESSAGE);
        err.code = MESSAGE.CATEGORY_UPDATE_CNAME_CODE;
        return next(err);
      }
      Category.update({
        name: body.name,
        cname: body.cname,
      }, {
        where: { id: id }
      })
        .then(Category.findByPk(id).then(oldTask => {
          oldTask.reload().then(task => {
            const plainTask = task.get({ plain: true });
            res.status(200).send({
              code: MESSAGE.CATEGORY_UPDATE_SUCCESS_CODE,
              message: MESSAGE.CATEGORY_UPDATE_SUCCESS_MESSAGE,
              list: [plainTask],
            });
          });
        }))
        .catch(err => {
          console.error(err);
          err.code = MESSAGE.CATEGORY_UPDATE_FAILURE_CODE;
          err.message = MESSAGE.CATEGORY_UPDATE_FAILURE_MESSAGE;
          return next(err);
        });
    })
      .catch(err => {
        console.error(err);
        next(err);
      });
  })
  // Delete a category
  .delete((req, res, next) => {
    const id = req.params.id;
    Category.findByPk(id).then(result => {
      if (!result) {
        const err = new Error(MESSAGE.CATEGORY_DELETE_ID_MESSAGE);
        err.code = MESSAGE.CATEGORY_DELETE_ID_CODE;
        return next(err);
      }
      Category.destroy({
        where: { id: id }
      })
        .then(() => {
          res.status(200).send({
            message: MESSAGE.CATEGORY_DELETE_SUCCESS_MESSAGE,
            code: MESSAGE.CATEGORY_DELETE_SUCCESS_CODE,
          });
        })
        .catch(err => {
          console.error(err);
          err.code = MESSAGE.CATEGORY_DELETE_FAILURE_CODE;
          err.message = MESSAGE.CATEGORY_DELETE_FAILURE_MESSAGE;
          return next(err);
        });
    })
      .catch(err => next(err));
  });

module.exports = router;
