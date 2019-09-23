/* question category CRUD */
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
        page: {
          current,
          perPage,
          count: result.count,
        },
        list: result.rows,
      });
    }).catch(error => {
      console.log(error);
      error.code = MESSAGE.QCATEGORY_READ_FAILURE_CODE;
      error.message = MESSAGE.QCATEGORY_READ_FAILURE_CODE;
      return next(error);
    });
  })

  /* Add question category */
  .post((req, res, next) => {
    const body = req.body;
    if (!body.name) {
      const error = new Error(MESSAGE.QCATEGORY_ADD_NAME_MESSAGE);
      error.code = MESSAGE.QCATEGORY_ADD_NAME_CODE;
      return next(error);
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
      .catch(error => {
        console.log(error);
        error.code = MESSAGE.QCATEGORY_ADD_FAILURE_CODE;
        error.message = MESSAGE.QCATEGORY_ADD_FAILURE_MESSAGE;
        return next(error);
      });
  });

router.route('/:id')
  /* Update question category */
  .put((req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Qcategory.findByPk(id).then(result => {
      if (result === null) {
        const error = new Error(MESSAGE.QCATEGORY_UPDATE_ID_MESSAGE);
        error.code = MESSAGE.QCATEGORY_UPDATE_ID_CODE;
        return next(error);
      }
      if (!body.name) {
        const error = new Error(MESSAGE.QCATEGORY_UPDATE_NAME_MESSAGE);
        error.code = MESSAGE.QCATEGORY_UPDATE_NAME_CODE;
        return next(error);
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
        .catch(error => {
          console.log(error);
          error.code = MESSAGE.QCATEGORY_UPDATE_FAILURE_CODE;
          error.message = MESSAGE.QCATEGORY_UPDATE_FAILURE_MESSAGE;
          return next(error);
        });
    })
      .catch(error => {
        console.log(error);
        next(error);
      });
  })
  /* Delete question category */
  .delete((req, res, next) => {
    const id = req.params.id;
    Qcategory.findByPk(id).then(result => {
      if (!result) {
        const error = new Error(MESSAGE.QCATEGORY_DELETE_ID_MESSAGE);
        error.code = MESSAGE.QCATEGORY_DELETE_ID_CODE;
        return next(error);
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
        .catch(error => {
          console.log(error);
          error.code = MESSAGE.QCATEGORY_DELETE_FAILURE_CODE;
          error.message = MESSAGE.QCATEGORY_DELETE_FAILURE_MESSAGE;
          return next(error);
        });
    })
      .catch(error => next(error));
  });

module.exports = router;
