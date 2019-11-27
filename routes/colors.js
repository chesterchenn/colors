/* 颜色页面 */
const express = require('express');
const router = express.Router();
const Colors = require('../db/colorsSequelize');
const Category = require('../db/categorySequelize');
const bodyParser = require('body-parser');
const MESSAGE = require('../MESSAGE.json');

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
        current,
        perPage,
        count: task.count,
        list: task.rows,
      });
    }).catch(err => {
      console.log(err);
      err.code = MESSAGE.COLORS_READ_FAILURE_CODE;
      err.message = MESSAGE.COLORS_READ_FAILURE_MESSAGE;
      return next(err);
    });
  })
  .post((req, res, next) => {
    const body = req.body;
    if (!body.name) {
      const err = new Error(MESSAGE.COLORS_ADD_NAME_MESSAGE);
      err.code = MESSAGE.COLORS_ADD_NAME_CODE;
      return next(err);
    }
    if (!body.cname) {
      const err = new Error(MESSAGE.COLORS_ADD_CNAME_MESSAGE);
      err.code = MESSAGE.COLORS_ADD_CNAME_CODE;
      return next(err);
    }
    if (!body.hex) {
      const err = new Error(MESSAGE.COLORS_ADD_LACKHEX_MESSAGE);
      err.code = MESSAGE.COLORS_ADD_LACKHEX_CODE;
      return next(err);
    }
    Category.findByPk(body.categoryId).then(cateResult => {
      if (!cateResult) {
        const err = new Error(MESSAGE.COLORS_ADD_CATEGORY_MESSAGE);
        err.code = MESSAGE.COLORS_ADD_CATEGORY_CODE;
        return next(err);
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
          if (err.errors[0].type === 'unique violation') {
            err.message = MESSAGE.COLORS_ADD_HEX_MESSAGE;
            err.code = MESSAGE.COLORS_ADD_HEX_CODE;
          }
          return next(err);
        });
    }).catch(err => {
      console.log(err);
      err.code = MESSAGE.COLORS_ADD_FAILURE_CODE;
      err.message = MESSAGE.COLORS_ADD_FAILURE_MESSAGE;
    });
  });

router.route('/:id')
  .put((req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Colors.findByPk(id).then(result => {
      if (result === null) {
        const err = new Error(MESSAGE.COLORS_UPDATE_ID_MESSAGE);
        err.code = MESSAGE.COLORS_UPDATE_ID_CODE;
        return next(err);
      }
      Category.findByPk(body.categoryId).then(cateResult => {
        if (!cateResult) {
          const err = new Error(MESSAGE.COLORS_UPDATE_CATEGORY_MESSAGE);
          err.code = MESSAGE.COLORS_UPDATE_CATEGORY_CODE;
          return next(err);
        }
        if (!body.name) {
          const err = new Error(MESSAGE.COLORS_UPDATE_NAME_MESSAGE);
          err.code = MESSAGE.COLORS_UPDATE_NAME_CODE;
          return next(err);
        }
        if (!body.cname) {
          const err = new Error(MESSAGE.COLORS_UPDATE_CNAME_MESSAGE);
          err.code = MESSAGE.COLORS_UPDATE_CNAME_CODE;
          return next(err);
        }
        if (!body.hex) {
          const err = new Error(MESSAGE.COLORS_UPDATE_LACKHEX_MESSAGE);
          err.code = MESSAGE.COLORS_UPDATE_LACKHEX_CODE;
          return next(err);
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
          .catch(err => {
            console.log(err);
            if (err.errors[0].type === 'unique violation') {
              err.message = MESSAGE.COLORS_ADD_HEX_MESSAGE;
              err.code = MESSAGE.COLORS_ADD_HEX_CODE;
            }
            return next(err);
          });
      });
    })
      .catch(err => {
        console.log(err);
        err.code = MESSAGE.COLORS_UPDATE_FAILURE_CODE;
        err.message = MESSAGE.COLORS_UPDATE_FAILURE_MESSAGE;
        return next(err);
      });
  })

  .delete((req, res, next) => {
    const deleteId = req.params.id;
    Colors.findByPk(deleteId).then(result => {
      if (!result) {
        const err = new Error(MESSAGE.COLORS_DELETE_ID_MESSAGE);
        err.code = MESSAGE.COLORS_DELETE_ID_CODE;
        return next(err);
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
        .catch(err => {
          console.log(err);
          err.code = MESSAGE.COLORS_DELETE_FAILURE_CODE;
          err.message = MESSAGE.COLORS_DELETE_FAILURE_MESSAGE;
          return next(err);
        });
    });
  });

module.exports = router;
