const express = require('express');
const router = express.Router();
const User = require('../db/userSequelize');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .post((req, res) => {
    const body = req.body;
    User.findOne({
      raw: true,
      where: {
        user: body.user,
        password: body.password,
      }
    }).then(task => {
      const token = jwt.sign({
        id: task.id,
        user: task.user,
        role: task.role,
      }, config.privateKey);
      res.status(200).send({
        token,
      });
    });
  });

module.exports = router;
