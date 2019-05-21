// Font-Style SQL CURD
const express = require('express');
const router = express.Router();
const FontStyle = require('../db/fontStyleSequelize');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  // get font-style
  .get((req, res) => {
    const current = ~~req.query.current || 1;
    const perPage = ~~req.query.perPage || 10;
    FontStyle.findAndCountAll({
      limit: perPage,
      offset: (current - 1) * perPage,
    }).then(result => {
      res.status(200).send({
        page: {
          current,
          perPage,
          count: result.count,
        },
        list: result.rows
      });
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
      error.code = '10000';
      return next(error);
    }
    if (!fontName) {
      const error = new Error('缺少字体颜色名称');
      error.code = '10001';
      return next(error);
    }
    if (!fontZhName) {
      const error = new Error('缺少字体颜色中文名称');
      error.code = '10002';
      return next(error);
    }
    FontStyle.create({
      font_color: fontColor,
      font_name: fontName,
      font_zh_name: fontZhName,
    })
      .then(task => {
        res.status(200).send(task);
      })
      .catch(error => {
        return next(error);
      });
  });

// Update a item from font-style
router.put('/:id', (req, res) => {
  let id = req.params.id;
  let body = req.body;
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
