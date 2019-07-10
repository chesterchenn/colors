// Category SQL CURD
const express = require('express');
const router = express.Router();
const Category = require('../db/categorySequelize');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')

  // get category list
  .get((req, res, next) => {
    const current = ~~req.query.current || 1;
    const perPage = ~~req.query.perPage || 10;
    Category.findAndCountAll({
      limit: perPage,
      offset: (current - 1) * perPage,
    }).then(result => {
      res.status(200).send({
        code: '10100',
        message: '查询成功',
        page: {
          current,
          perPage,
          count: result.count,
        },
        list: result.rows,
      });
    }).catch(error => {
      error.message = '查询失败';
      error.code = '10101';
      return next(error);
    });
  })

  // Add a category
  .post((req, res, next) => {
    const body = req.body;
    if (!body.name) {
      const error = new Error('缺少名称');
      error.code = '10104';
      return next(error);
    }
    if (!body.cname) {
      const error = new Error('缺少中文名称');
      error.code = '10105';
      return next(error);
    }
    Category.create({
      name: body.name,
      cname: body.cname,
    })
      .then(task => {
        const result = task.get({
          plain: true
        });
        res.status(200).send({
          code: '10102',
          message: '新增成功',
          list: [{
            ...result
          }],
        });
      })
      .catch(error => {
        console.log(error);
        error.message = '新增失败';
        error.code = '10103';
        return next(error);
      });
  });

router.route('/:id')
  // Update a category
  .put((req, res, next) => {
    const id = req.params.id;
    Category.findByPk(id).then(result => {
      if (!result) {
        const error = new Error('ID不存在');
        error.code = '10108';
        return next(error);
      } else {
        const body = req.body;
        if (!body.name) {
          const error = new Error('缺少名称');
          error.code = '10104';
          return next(error);
        }
        if (!body.cname) {
          const error = new Error('缺少中文名称');
          error.code = '10105';
          return next(error);
        }
        Category.update({
          name: body.name,
          cname: body.cname,
        }, {
          where: { id: id }
        })
          .then(Category.findByPk(id)
            .then(task => {
              res.status(200).send({
                code: '10106',
                message: '更新成功',
                list: [task],
              });
            }))
          .catch(error => {
            return next(error);
          });
      }
    })
      .catch(error => next(error));
  })
  // Delete a category
  .delete((req, res, next) => {
    const id = req.params.id;
    Category.findByPk(id).then(result => {
      if (!result) {
        const error = new Error('ID不存在');
        error.code = '10108';
        return next(error);
      } else {
        Category.destroy({
          where: { id: id }
        })
          .then(() => {
            res.status(200).send({
              message: '删除成功',
              code: '10109',
            });
          })
          .catch(error => {
            console.log(error);
            return next(error);
          });
      }
    }).catch(error => next(error));
  });

module.exports = router;
