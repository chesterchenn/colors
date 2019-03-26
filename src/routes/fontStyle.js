// Font-Style SQL CURD
const express = require('express');
const router = express.Router();
const FontStyle = require('../db/FSSequelize');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .get((req, res) => {
    FontStyle.findAll().then(rows => {
      res.status(200).send(rows);
    });
  })
  .post((req, res) => {
    let body = req.body;
    FontStyle.create({
      font_color: body.fontColor,
      font_name: body.fontName,
      font_zh_name: body.fontZhName
    })
      .then(task => {
        res.status(200).send(task);
      })
      .catch(error => {
        res.status(400).json(error);
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
