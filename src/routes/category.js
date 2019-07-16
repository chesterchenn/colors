// Category SQL CURD
const express = require('express');
const router = express.Router();
const Category = require('../db/categorySequelize');
const bodyParser = require('body-parser');
const MESSAGE = require('../../MESSAGE.json');

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
        page: {
          current,
          perPage,
          count: result.count,
        },
        list: result.rows,
      });
    }).catch(error => {
      console.log(error);
      error.code = MESSAGE.CATEGORY_READ_FAILURE_CODE;
      error.message = MESSAGE.CATEGORY_READ_FAILURE_CODE;
      return next(error);
    });
  })

  // Add a category
  .post((req, res, next) => {
    const body = req.body;
    if (!body.name) {
      const error = new Error(MESSAGE.CATEGORY_ADD_NAME_MESSAGE);
      error.code = MESSAGE.CATEGORY_ADD_NAME_CODE;
      return next(error);
    }
    if (!body.cname) {
      const error = new Error(MESSAGE.CATEGORY_ADD_CNAME_MESSAGE);
      error.code = MESSAGE.CATEGORY_ADD_CNAME_CODE;
      return next(error);
    }
    Category.create({
      name: body.name,
      cname: body.cname,
    })
      .then(task => {
        const result = task.get({
          plain: true
        });
        res.status(200).send({
          code: MESSAGE.CATEGORY_ADD_SUCCESS_CODE,
          message: MESSAGE.CATEGORY_ADD_SUCCESS_MESSAGE,
          list: [{
            ...result
          }],
        });
      })
      .catch(error => {
        console.log(error);
        error.code = MESSAGE.CATEGORY_ADD_FAILURE_CODE;
        error.message = MESSAGE.CATEGORY_ADD_FAILURE_MESSAGE;
        return next(error);
      });
  });

router.route('/:id')
  // Update a category
  .put((req, res, next) => {
    const id = req.params.id;
    Category.findByPk(id).then(result => {
      if (!result) {
        const error = new Error(MESSAGE.CATEGORY_UPDATE_ID_MESSAGE);
        error.code = MESSAGE.CATEGORY_UPDATE_ID_CODE;
        return next(error);
      } else {
        const body = req.body;
        if (!body.name) {
          const error = new Error(MESSAGE.CATEGORY_UPDATE_NAME_MESSAGE);
          error.code = MESSAGE.CATEGORY_UPDATE_NAME_CODE;
          return next(error);
        }
        if (!body.cname) {
          const error = new Error(MESSAGE.CATEGORY_UPDATE_CNAME_MESSAGE);
          error.code = MESSAGE.CATEGORY_UPDATE_CNAME_CODE;
          return next(error);
        }
        Category.update({
          name: body.name,
          cname: body.cname,
        }, {
          where: { id: id }
        })
          .then(Category.findByPk(id)
            .then(oldTask => {
              oldTask.reload().then(task => {
                const plainTask = task.get({
                  plain: true
                });
                res.status(200).send({
                  code: MESSAGE.CATEGORY_UPDATE_SUCCESS_CODE,
                  message: MESSAGE.CATEGORY_UPDATE_SUCCESS_MESSAGE,
                  list: [{...plainTask}],
                });
              })
            }))
          .catch(error => {
            console.log(error);
            error.code = MESSAGE.CATEGORY_UPDATE_FAILURE_CODE;
            error.message = MESSAGE.CATEGORY_UPDATE_FAILURE_MESSAGE;
            return next(error);
          });
      }
    })
      .catch(error => {
        console.log(error);
        next(error);
      });
  })
  // Delete a category
  .delete((req, res, next) => {
    const id = req.params.id;
    Category.findByPk(id).then(result => {
      if (!result) {
        const error = new Error(MESSAGE.CATEGORY_DELETE_ID_MESSAGE);
        error.code = MESSAGE.CATEGORY_DELETE_ID_CODE;
        return next(error);
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
        .catch(error => {
          console.log(error);
          error.code = MESSAGE.CATEGORY_DELETE_FAILURE_CODE;
          error.message = MESSAGE.CATEGORY_DELETE_FAILURE_MESSAGE;
          return next(error);
        });
    })
    .catch(error => next(error));
  });

module.exports = router;
