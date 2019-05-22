// Category SQL CURD
const express = require('express');
const router = express.Router();
const Colors = require('../db/colorsSequelize');
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
      })
    }).catch(error => {
      error.message = '查询失败';
      error.code = '10201';
      return next(error);
    });
  })
  .post((req, res, next) => {
    const body = req.body;
    if (!body.fontId) {
      const error = new Error('字体颜色不存在');
      error.code = '10006';
      return next(error);
    }
    Colors.create({
      color_hex: body.colorHex,
      color_name: body.colorName,
      color_order: body.colorOrder,
      font_id: body.fontId,
      color_zh_name: body.colorZhName,
      cate_id: body.cateId,
    })
      .then(task => {
        res.status(200).send({
          code: '10202',
          message: '新增成功',
          list: [task],
        });
      })
      .catch(error => {
        // error.message = '新增失败';
        error.code = '10203';
        return next(error);
      });
  });

router.route('/:id')
  .put((req, res) => {
    let id = req.params.id;
    let body = req.body;
    Colors.update({
      color_hex: body.colorHex,
      color_name: body.colorName,
      color_order: body.colorOrder,
      font_id: body.fontId,
      color_zh_name: body.colorZhName,
      cate_id: body.cateId,
    }, {
      returning: true, where: { color_id: id }
    })
      .then(task => {
        res.status(200).send(task);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  })
  .delete((req, res) => {
    Colors.destroy({
      where: { color_id: req.params.id }
    })
      .then((rowsDeleted) => {
        res.status(200).send(rowsDeleted);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  })

module.exports = router;
