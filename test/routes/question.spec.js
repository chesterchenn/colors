const request = require('supertest');
const app = require('../../index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const instance = require('../instance');
const Question = require('../../db/question');
const Qcategory = require('../../db/Qcategory');
const api = '/question';
const categoryAPI = '/qcategory';

describe('QUESTION API TEST', function() {
  before(function() {
    Question.destroy({
      where: {},
    });
    Qcategory.destroy({
      where: {},
    });
  });

  let category, questionId;
  /* Create a category to use test */
  before(function() {
    request(app)
      .post(categoryAPI)
      .send({
        name: instance.name,
      })
      .then(function(res) {
        category = res.body.list[0].id;
      }).
      catch(err => {
        console.error(err);
      });
  });

  describe('Read Question', function() {
    it('should read question list', function(done) {
      request(app)
        .get(api)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_READ_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_READ_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  describe('Create Question', function() {
    it('should create question failure when missing question', function(done) {
      request(app)
        .post(api)
        .send({
          answer: instance.answer,
          category: category,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_ADD_QUESTION_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_ADD_QUESTION_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create question failure when missing answer', function(done) {
      request(app)
        .post(api)
        .send({
          question: instance.question,
          category: category,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_ADD_ANSWER_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_ADD_ANSWER_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create question failure when missing category', function(done) {
      request(app)
        .post(api)
        .send({
          question: instance.question,
          answer: instance.answer,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_ADD_CATEGORY_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_ADD_CATEGORY_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create question success', function(done) {
      request(app)
        .post(api)
        .send({
          question: instance.question,
          answer: instance.answer,
          category: category,
        })
        .expect(200)
        .then(function(res) {
          questionId = res.body.list[0].id;
          expect(res.body.code).eq(MESSAGE.QUESTION_ADD_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_ADD_SUCCESS_MESSAGE);
          expect(res.body.list[0].question).to.equal(instance.question);
          expect(res.body.list[0].answer).to.equal(instance.answer);
          expect(res.body.list[0].category).to.equal(category);
          done();
        })
        .catch(done);
    });
  });

  describe('Update Question', function() {
    it(`should update question failure when id isn't exist`, function(done) {
      request(app)
        .put(api + '/' + instance.nonExistId)
        .send({
          question: instance.question,
          answer: instance.answer,
          category: category,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_UPDATE_ID_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_UPDATE_ID_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update question failure when missing question`, function(done) {
      request(app)
        .put(api + '/' + questionId)
        .send({
          answer: instance.updateAnswer,
          category: category,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_UPDATE_QUESTION_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_UPDATE_QUESTION_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update question failure when missing answer`, function(done) {
      request(app)
        .put(api + '/' + questionId)
        .send({
          question: instance.updateQuestion,
          category: category,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_UPDATE_ANSWER_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_UPDATE_ANSWER_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update question failure when missing category`, function(done) {
      request(app)
        .put(api + '/' + questionId)
        .send({
          answer: instance.updateAnswer,
          question: instance.updateQuestion,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_UPDATE_CATEGORY_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_UPDATE_CATEGORY_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update question success`, function(done) {
      // const data = ;
      request(app)
        .put(api + '/' + questionId)
        .send({
          question: instance.updateQuestion,
          answer: instance.updateAnswer,
          category: category,
        })
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_UPDATE_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_UPDATE_SUCCESS_MESSAGE);
          expect(res.body.list[0].id).to.equal(questionId);
          expect(res.body.list[0].question).to.equal(instance.updateQuestion);
          expect(res.body.list[0].answer).to.equal(instance.updateAnswer);
          expect(res.body.list[0].category).to.equal(category);
          done();
        })
        .catch(done);
    });
  });

  describe('Remove Question', function() {
    it(`should delete question failure when id isn't exist`, function(done) {
      request(app)
        .delete(api + '/' + instance.nonExistId)
        .expect(400)
        .then(function(res) {
          expect(res.body.code).to.eq(MESSAGE.QUESTION_DELETE_ID_CODE);
          expect(res.body.message).to.eq(MESSAGE.QUESTION_DELETE_ID_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should delete question success`, function(done) {
      request(app)
        .delete(api + '/' + questionId)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).to.eq(MESSAGE.QUESTION_DELETE_SUCCESS_CODE);
          expect(res.body.message).to.eq(MESSAGE.QUESTION_DELETE_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  /* Delete the category */
  after(function(done) {
    request(app)
      .delete(categoryAPI + '/' + category)
      .then(function() {
        done();
      })
      .catch(done);
  });
});
