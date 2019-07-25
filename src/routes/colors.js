// Category SQL CURD
const express = require('express');
const router = express.Router();
const Colors = require('../db/colorsSequelize');
const Category = require('../db/categorySequelize');
const bodyParser = require('body-parser');
const MESSAGE = require('../../MESSAGE.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .get((req, res, next) => {
    const current = ~~req.query.current || 1;
    const perPage = ~~req.query.perPage || 10;
    Colors.findAndCountAll({
      limit: perPage,
      offset: (current - 1) * perPage,
      raw: true
    }).then(task => {
      res.status(200).send({
        code: MESSAGE.COLORS_READ_SUCCESS_CODE,
        message: MESSAGE.COLORS_READ_SUCCESS_MESSAGE,
        page: {
          current,
          perPage,
          count: task.count,
        },
        list: task.rows,
      });
    }).catch(error => {
      console.log(error);
      error.code = MESSAGE.COLORS_READ_FAILURE_CODE;
      error.message = MESSAGE.COLORS_READ_FAILURE_MESSAGE;
      return next(error);
    });
  })
  .post((req, res, next) => {
    const body = req.body;
    Category.findByPk(body.categoryId).then(cateResult => {
      if (!cateResult) {
        const error = new Error(MESSAGE.COLORS_ADD_CATEGORY_MESSAGE);
        error.code = MESSAGE.COLORS_ADD_CATEGORY_CODE;
        return next(error);
      }
      if (!body.name) {
        const error = new Error(MESSAGE.COLORS_ADD_NAME_MESSAGE);
        error.code = MESSAGE.COLORS_ADD_NAME_CODE;
        return next(error);
      }
      if (!body.Cname) {
        const error = new Error(MESSAGE.COLORS_ADD_CNAME_MESSAGE);
        error.code = MESSAGE.COLORS_ADD_CNAME_CODE;
        return next(error);
      }
      if (!body.hex) {
        const error = new Error(MESSAGE.COLORS_ADD_LACKHEX_MESSAGE);
        error.code = MESSAGE.COLORS_ADD_LACKHEX_CODE;
        return next(error);
      }
      Colors.create({
        hex: body.hex,
        name: body.name,
        fontColor: body.fontColor,
        cname: body.cname,
        categoryId: body.categoryId,
      })
        .then(task => {
          const plainTask = task.get({
            plain: true
          });
          res.status(200).send({
            code: MESSAGE.COLORS_ADD_SUCCESS_CODE,
            message: MESSAGE.COLORS_ADD_SUCCESS_MESSAGE,
            list: [plainTask],
          });
        })
        .catch(err => {
          console.log(err);
          if (err.errors[0].type === 'unique violation') {
            err.message = MESSAGE.COLORS_ADD_HEX_MESSAGE;
            err.code = MESSAGE.COLORS_ADD_HEX_CODE;
          }
          return next(err);
        });
    }).catch(err => {
      console.log(err);
      error.code = MESSAGE.COLORS_ADD_FAILURE_CODE;
      error.message = MESSAGE.COLORS_ADD_FAILURE_MESSAGE;
    });
  });

router.route('/:id')
  .put((req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Colors.findByPk(id).then(result => {
      if (!result) {
        const error = new Error(MESSAGE.COLORS_UPDATE_ID_MESSAGE);
        error.code = MESSAGE.COLORS_UPDATE_ID_CODE;
        return next(error);
      }
      Category.findByPk(body.categoryId).then(cateResult => {
        if (!cateResult) {
          const error = new Error(MESSAGE.COLORS_UPDATE_CATEGORY_MESSAGE);
          error.code = MESSAGE.COLORS_UPDATE_CATEGORY_CODE;
          return next(error);
        }
        Colors.update({
          hex: body.hex,
          name: body.name,
          fontColor: body.fontColor,
          cname: body.cname,
          categoryId: body.categoryId,
        }, {
          returning: true, where: { id: id }
        })
          .then(Colors.findByPk(id).then(oldTask => {
            oldTask.reload().then(task => {
              const plainTask = task.get({
                plain: true
              });
              res.status(200).send({
                code: MESSAGE.COLORS_UPDATE_SUCCESS_CODE,
                message: MESSAGE.COLORS_UPDATE_SUCCESS_MESSAGE,
                list: [plainTask],
              });
            });
          }))
          .catch(error => {
            console.log(error);
            if (error.errors[0].type === 'unique violation') {
              error.message = MESSAGE.COLORS_ADD_HEX_MESSAGE;
              error.code = MESSAGE.COLORS_ADD_HEX_CODE;
            }
            return next(error);
          });
      });
    })
      .catch(error => {
        console.log(error);
        error.code = MESSAGE.COLORS_UPDATE_FAILURE_CODE;
        error.message = MESSAGE.COLORS_UPDATE_FAILURE_MESSAGE;
        return next(error);
      });
  })

  .delete((req, res) => {
    const deleteId = req.params.id;
    Colors.findByPk(deleteId).then(result => {
      if (!result) {
        const error = new Error(MESSAGE.COLORS_DELETE_ID_MESSAGE);
        error.code = MESSAGE.COLORS_DELETE_ID_CODE;
        return next(error);
      }
      Colors.destroy({
        where: { id: deleteId }
      })
        .then(() => {
          res.status(200).send({
            message: MESSAGE.COLORS_DELETE_SUCCESS_MESSAGE,
            code: MESSAGE.COLORS_DELETE_SUCCESS_CODE,
          });
        })
        .catch(error => {
          console.log(error);
          error.code = MESSAGE.COLORS_DELETE_FAILURE_CODE;
          error.message = MESSAGE.COLORS_DELETE_FAILURE_MESSAGE;
          return next(error);
        });
    });
  });

module.exports = router;
