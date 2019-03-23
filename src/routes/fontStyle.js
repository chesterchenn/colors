const express = require('express');
const router = express.Router();
const FontStyle = require('../db/FSSequelize');

router.get('/', (req, res, next) => {
  FontStyle.findAll({
    attributes: ['font_color', 'font_name', 'font_zh_name', 'created_at']
  }).then(rows => {
    console.log(rows);
    res.send(rows);
  })
})

module.exports = router;
