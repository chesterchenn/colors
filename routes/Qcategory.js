/* 问题分类页面 */
const express = require('express');
const router = express.Router();
const Qcategory = require('../db/Qcategory');
const bodyParser = require('body-parser');
const MESSAGE = require('../MESSAGE.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  /* get question category list */
  .get((req, res, next) => {
    const current = ~~req.query.current || 1;
    const perPage = ~~req.query.perPage || 10;
    Qcategory.findAndCountAll({
      limit: perPage,
      offset: (current - 1) * perPage,
      raw: true,
    }).then(result => {
      res.status(200).send({
        code: MESSAGE.QCATEGORY_READ_SUCCESS_CODE,
        message: MESSAGE.QCATEGORY_READ_SUCCESS_MESSAGE,
        current,
        perPage,
        count: result.count,
        list: result.rows,
      });
    }).catch(err => {
      console.error(err);
      err.code = MESSAGE.QCATEGORY_READ_FAILURE_CODE;
      err.message = MESSAGE.QCATEGORY_READ_FAILURE_CODE;
      return next(err);
    });
  })

  /* Add question category */
  .post((req, res, next) => {
    const body = req.body;
    if (!body.name) {
      const err = new Error(MESSAGE.QCATEGORY_ADD_NAME_MESSAGE);
      err.code = MESSAGE.QCATEGORY_ADD_NAME_CODE;
      return next(err);
    }
    Qcategory.create({
      name: body.name,
    })
      .then(task => {
        const plainTask = task.get({
          plain: true
        });
        res.status(200).send({
          code: MESSAGE.QCATEGORY_ADD_SUCCESS_CODE,
          message: MESSAGE.QCATEGORY_ADD_SUCCESS_MESSAGE,
          list: [plainTask],
        });
      })
      .catch(err => {
        console.error(err);
        err.code = MESSAGE.QCATEGORY_ADD_FAILURE_CODE;
        err.message = MESSAGE.QCATEGORY_ADD_FAILURE_MESSAGE;
        return next(err);
      });
  });

router.route('/:id')
  /* Update question category */
  .put((req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Qcategory.findByPk(id).then(result => {
      if (result === null) {
        const err = new Error(MESSAGE.QCATEGORY_UPDATE_ID_MESSAGE);
        err.code = MESSAGE.QCATEGORY_UPDATE_ID_CODE;
        return next(err);
      }
      if (!body.name) {
        const err = new Error(MESSAGE.QCATEGORY_UPDATE_NAME_MESSAGE);
        err.code = MESSAGE.QCATEGORY_UPDATE_NAME_CODE;
        return next(err);
      }
      Qcategory.update({
        name: body.name,
      }, {
        where: { id: id }
      })
        .then(Qcategory.findByPk(id).then(oldTask => {
          oldTask.reload().then(task => {
            const plainTask = task.get({ plain: true });
            res.status(200).send({
              code: MESSAGE.QCATEGORY_UPDATE_SUCCESS_CODE,
              message: MESSAGE.QCATEGORY_UPDATE_SUCCESS_MESSAGE,
              list: [plainTask],
            });
          });
        }))
        .catch(err => {
          console.error(err);
          err.code = MESSAGE.QCATEGORY_UPDATE_FAILURE_CODE;
          err.message = MESSAGE.QCATEGORY_UPDATE_FAILURE_MESSAGE;
          return next(err);
        });
    })
      .catch(err => {
        console.error(err);
        next(err);
      });
  })
  /* Delete question category */
  .delete((req, res, next) => {
    const id = req.params.id;
    Qcategory.findByPk(id).then(result => {
      if (!result) {
        const err = new Error(MESSAGE.QCATEGORY_DELETE_ID_MESSAGE);
        err.code = MESSAGE.QCATEGORY_DELETE_ID_CODE;
        return next(err);
      }
      Qcategory.destroy({
        where: { id: id }
      })
        .then(() => {
          res.status(200).send({
            message: MESSAGE.QCATEGORY_DELETE_SUCCESS_MESSAGE,
            code: MESSAGE.QCATEGORY_DELETE_SUCCESS_CODE,
          });
        })
        .catch(err => {
          console.error(err);
          err.code = MESSAGE.QCATEGORY_DELETE_FAILURE_CODE;
          err.message = MESSAGE.QCATEGORY_DELETE_FAILURE_MESSAGE;
          return next(err);
        });
    })
      .catch(err => next(err));
  });

module.exports = router;
