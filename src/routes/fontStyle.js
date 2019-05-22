// Font-Style SQL CURD
const express = require('express');
const router = express.Router();
const FontStyle = require('../db/fontStyleSequelize');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  // get font-style
  .get((req, res, next) => {
    const current = ~~req.query.current || 1;
    const perPage = ~~req.query.perPage || 10;
    FontStyle.findAndCountAll({
      limit: perPage,
      offset: (current - 1) * perPage,
    }).then(result => {
      res.status(200).send({
        code: '10000',
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
      error.code = '10001';
      return next(error);
    });
  })
  // crated a font-style
  .post((req, res, next) => {
    const body = req.body;
    const fontColor = body.fontColor;
    const fontName = body.fontName;
    const fontZhName = body.fontZhName;

    // error handle
    if (!fontColor) {
      const error = new Error('缺少Hex值');
      error.code = '10004';
      return next(error);
    }
    if (!fontName) {
      const error = new Error('缺少名称');
      error.code = '10005';
      return next(error);
    }
    if (!fontZhName) {
      const error = new Error('缺少中文名称');
      error.code = '10006';
      return next(error);
    }
    FontStyle.create({
      font_color: fontColor,
      font_name: fontName,
      font_zh_name: fontZhName,
    })
      .then(task => {
        res.status(200).send({
          code: '10002',
          message: '新增成功',
          list: [task],
        });
      })
      .catch(error => {
        error.message = '新增失败';
        error.code = '10003';
        return next(error);
      });
  });

// Update a item from font-style
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const fontColor = body.fontColor;
  const fontName = body.fontName;
  const fontZhName = body.fontZhName;

  // error handle
  FontStyle.findByPk(id).then(result => {
    // if id isn't exit, return
    if (result === null) {
      const error = new Error('ID不存在');
      error.code = '10009';
      return next(error);
    } else {
      if (!fontColor) {
        const error = new Error('缺少Hex值');
        error.code = '10004';
        return next(error);
      }
      if (!fontName) {
        const error = new Error('缺少名称');
        error.code = '10005';
        return next(error);
      }
      if (!fontZhName) {
        const error = new Error('缺少中文名称');
        error.code = '10006';
        return next(error);
      }
      FontStyle.update({
        font_color: fontColor,
        font_name: fontName,
        font_zh_name: fontZhName,
      }, {
         where: { font_id: id }
      })
        .then(FontStyle.findByPk(id)
          .then((updateItem ) => {
            res.status(200).send({
              code: '10007',
              message: '更新成功',
              list: [updateItem],
            });
          }))
        .catch(error => {
          error.message = '更新失败';
          error.code = '10008';
          return next(error);
        });
    }
  })
  .catch(error => next(error))
});

// Delete a item from font-style
router.delete('/:id', (req, res, next) => {
  FontStyle.findByPk(req.params.id).then(result => {
    // if id isn't exit, return
    if (!result) {
      const error = new Error('ID不存在');
      error.code = '10009';
      return next(error);
    } else {
      FontStyle.destroy({
        where: { font_id: req.params.id }
      })
        .then(() => {
          res.status(200).send({
            message: '删除成功',
            code: '10010',
          });
        })
        .catch(error => {
          error.message = '删除失败',
          error.code = '10011';
          return next(error);
        });
    }
  }).catch(error => next(error))
});

module.exports = router;
