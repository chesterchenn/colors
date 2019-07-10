// Category SQL CURD
const express = require('express');
const router = express.Router();
const Colors = require('../db/colorsSequelize');
const Category = require('../db/categorySequelize');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .get((req, res, next) => {
    const current = ~~req.query.current || 1;
    const perPage = ~~req.query.perPage || 10;
    Colors.findAndCountAll({
      limit: perPage,
      offset: (current - 1) * perPage,
    }).then(result => {
      res.status(200).send({
        code: '10200',
        message: '查询成功',
        page: {
          current,
          perPage,
          count: result.count,
        },
        list: result.rows,
      });
    }).catch(error => {
      error.code = '10201';
      return next(error);
    });
  })
  .post((req, res, next) => {
    const body = req.body;
    Category.findByPk(body.categoryId).then(cateResult => {
      if (!cateResult) {
        const error = new Error('分类不存在');
        error.code = '10205';
        return next(error);
      }
      Colors.create({
        hex: body.hex,
        name: body.name,
        font_id: body.fontId,
        cname: body.cname,
        categoryId: body.categoryId,
      })
        .then(task => {
          res.status(200).send({
            code: '10202',
            message: '新增成功',
            list: [{
              ...task
            }],
          });
        })
        .catch(error => {
          return next(error);
        });
    });
  });

router.route('/:id')
  .put((req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Colors.findByPk(id).then(result => {
      if (!result) {
        const error = new Error('ID不存在');
        error.code = '10209';
        return next(error);
      }

      Category.findByPk(body.categoryId).then(cateResult => {
        if (!cateResult) {
          const error = new Error('分类不存在');
          error.code = '10205';
          return next(error);
        }
        Colors.update({
          hex: body.hex,
          name: body.name,
          font_id: body.fontId,
          cname: body.cname,
          categoryId: body.categoryId,
        }, {
          returning: true, where: { id: id }
        })
          .then(task => {
            res.status(200).send({
              code: '10207',
              message: '更新成功',
              list: [task],
            });
          })
          .catch(error => {
            return next(error);
          });
      });
    });
  })
  .delete((req, res) => {
    Colors.destroy({
      where: { id: req.params.id }
    })
      .then((rowsDeleted) => {
        res.status(200).send(rowsDeleted);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  });

module.exports = router;
