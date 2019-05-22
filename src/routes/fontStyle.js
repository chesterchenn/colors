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
    if (!fontColor) {
      const error = new Error('缺少字体颜色Hex值');
      error.code = '10004';
      return next(error);
    }
    if (!fontName) {
      const error = new Error('缺少字体颜色名称');
      error.code = '10005';
      return next(error);
    }
    if (!fontZhName) {
      const error = new Error('缺少字体颜色中文名称');
      error.code = '10006';
      return next(error);
    }
    FontStyle.create({
      font_color: fontColor,
      font_name: fontName,
      font_zh_name: fontZhName,
    })
      .then(task => {
        console.log(task);
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
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  FontStyle.update({
    font_color: body.fontColor,
    font_name: body.fontName,
    font_zh_name: body.fontZhName,
  }, {
    returning: true, where: { font_id: id }
  })
    .then((rowsUpdate) => {
      res.status(200).send(rowsUpdate);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// Delete a item from font-style
router.delete('/:id', (req, res) => {
  FontStyle.destroy({
    where: { font_id: req.params.id }
  })
    .then((rowsDeleted) => {
      res.status(200).send(rowsDeleted);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

module.exports = router;
