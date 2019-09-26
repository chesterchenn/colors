// Quetion SQL CURD
const express = require('express');
const router = express.Router();
const Question = require('../db/question');
const Qcategory = require('../db/Qcategory');
const bodyParser = require('body-parser');
const MESSAGE = require('../MESSAGE.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .get((req, res, next) => {
    const current = ~~req.query.current || 1;
    const perPage = ~~req.query.perPage || 10;
    Question.findAndCountAll({
      limit: perPage,
      offset: (current - 1) * perPage,
      raw: true
    }).then(task => {
      res.status(200).send({
        code: MESSAGE.QUESTION_READ_SUCCESS_CODE,
        message: MESSAGE.QUESTION_READ_SUCCESS_MESSAGE,
        current,
        perPage,
        count: task.count,
        list: task.rows,
      });
    }).catch(error => {
      console.log(error);
      error.code = MESSAGE.QUESTION_READ_FAILURE_CODE;
      error.message = MESSAGE.QUESTION_READ_FAILURE_MESSAGE;
      return next(error);
    });
  })
  .post((req, res, next) => {
    const body = req.body;
    if (!body.question) {
      const error = new Error(MESSAGE.QUESTION_ADD_QUESTION_MESSAGE);
      error.code = MESSAGE.QUESTION_ADD_QUESTION_CODE;
      return next(error);
    }
    if (!body.answer) {
      const error = new Error(MESSAGE.QUESTION_ADD_ANSWER_MESSAGE);
      error.code = MESSAGE.QUESTION_ADD_ANSWER_CODE;
      return next(error);
    }
    Qcategory.findByPk(body.category).then(cateResult => {
      if (!cateResult) {
        const error = new Error(MESSAGE.QUESTION_ADD_CATEGORY_MESSAGE);
        error.code = MESSAGE.QUESTION_ADD_CATEGORY_CODE;
        return next(error);
      }
      Question.create({
        question: body.question,
        answer: body.answer,
        category: body.category,
      })
        .then(task => {
          const plainTask = task.get({
            plain: true
          });
          res.status(200).send({
            code: MESSAGE.QUESTION_ADD_SUCCESS_CODE,
            message: MESSAGE.QUESTION_ADD_SUCCESS_MESSAGE,
            list: [plainTask],
          });
        })
        .catch(err => {
          console.log(err);
          return next(err);
        });
    }).catch(err => {
      console.log(err);
      error.code = MESSAGE.QUESTION_ADD_FAILURE_CODE;
      error.message = MESSAGE.QUESTION_ADD_FAILURE_MESSAGE;
    });
  });

router.route('/:id')
  .put((req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Question.findByPk(id).then(result => {
      if (result === null) {
        const error = new Error(MESSAGE.QUESTION_UPDATE_ID_MESSAGE);
        error.code = MESSAGE.QUESTION_UPDATE_ID_CODE;
        return next(error);
      }
      Qcategory.findByPk(body.category).then(cateResult => {
        if (!cateResult) {
          const error = new Error(MESSAGE.QUESTION_UPDATE_CATEGORY_MESSAGE);
          error.code = MESSAGE.QUESTION_UPDATE_CATEGORY_CODE;
          return next(error);
        }
        if (!body.question) {
          const error = new Error(MESSAGE.QUESTION_UPDATE_QUESTION_MESSAGE);
          error.code = MESSAGE.QUESTION_UPDATE_QUESTION_CODE;
          return next(error);
        }
        if (!body.answer) {
          const error = new Error(MESSAGE.QUESTION_UPDATE_ANSWER_MESSAGE);
          error.code = MESSAGE.QUESTION_UPDATE_ANSWER_CODE;
          return next(error);
        }
        Question.update({
          question: body.question,
          answer: body.answer,
          category: body.category,
        }, {
          returning: true, where: { id: id }
        })
          .then(Question.findByPk(id).then(oldTask => {
            oldTask.reload().then(task => {
              const plainTask = task.get({
                plain: true
              });
              res.status(200).send({
                code: MESSAGE.QUESTION_UPDATE_SUCCESS_CODE,
                message: MESSAGE.QUESTION_UPDATE_SUCCESS_MESSAGE,
                list: [plainTask],
              });
            });
          }))
          .catch(error => {
            console.log(error);
            return next(error);
          });
      });
    })
      .catch(error => {
        console.log(error);
        error.code = MESSAGE.QUESTION_UPDATE_FAILURE_CODE;
        error.message = MESSAGE.QUESTION_UPDATE_FAILURE_MESSAGE;
        return next(error);
      });
  })

  .delete((req, res, next) => {
    const deleteId = req.params.id;
    Question.findByPk(deleteId).then(result => {
      if (!result) {
        const error = new Error(MESSAGE.QUESTION_DELETE_ID_MESSAGE);
        error.code = MESSAGE.QUESTION_DELETE_ID_CODE;
        return next(error);
      }
      Question.destroy({
        where: { id: deleteId }
      })
        .then(() => {
          res.status(200).send({
            message: MESSAGE.QUESTION_DELETE_SUCCESS_MESSAGE,
            code: MESSAGE.QUESTION_DELETE_SUCCESS_CODE,
          });
        })
        .catch(error => {
          console.log(error);
          error.code = MESSAGE.QUESTION_DELETE_FAILURE_CODE;
          error.message = MESSAGE.QUESTION_DELETE_FAILURE_MESSAGE;
          return next(error);
        });
    });
  });

module.exports = router;
