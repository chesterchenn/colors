// Category SQL CURD
const express = require('express');
const router = express.Router();
const Colors = require('../db/colorsSequelize');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .get((req, res) => {
    Colors.findAll().then(rows => {
      res.status(200).send(rows);
    });
  })
  .post((req, res) => {
    let body = req.body;
    Colors.create({
      color_hex: body.colorHex,
      color_name: body.colorName,
      color_order: body.colorOrder,
      font_id: body.fontId,
      color_zh_name: body.colorZhName,
      cate_id: body.cateId,
    })
      .then(task => {
        res.status(200).send(task);
      })
      .catch(error => {
        res.status(400).json(error);
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
