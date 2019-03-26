// Category SQL CURD
const express = require('express');
const router = express.Router();
const Category = require('../db/CaSequelize');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .get((req, res) => {
    Category.findAll().then(rows => {
      res.status(200).send(rows);
    });
  })
  .post((req, res) => {
    let body = req.body;
    Category.create({
      cate_name: body.cateName,
      cate_zh_name: body.cateZhName
    })
      .then(task => {
        res.status(200).send(task);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  });

  module.exports = Category;
