const request = require('supertest');
const app = require('../../index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const questionInstance = require('../instance').question;
const categoryInstance = require('../instance').category;
const api = '/question';
const categoryAPI = '/qcategory';

describe('Question API test case: ', function() {
  let category, questionInstanceId;
  /* Create a category to use test */
  before(function() {
    request(app)
      .post(categoryAPI)
      .send({
        name: categoryInstance.name,
      })
      .then(function(res) {
        category = res.body.list[0].id;
      }).
      catch(err => {
        console.log(err);
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
          answer: questionInstance.answer,
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
          question: questionInstance.question,
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
          question: questionInstance.question,
          answer: questionInstance.answer,
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
          question: questionInstance.question,
          answer: questionInstance.answer,
          category: category,
        })
        .expect(200)
        .then(function(res) {
          questionInstanceId = res.body.list[0].id;
          expect(res.body.code).eq(MESSAGE.QUESTION_ADD_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_ADD_SUCCESS_MESSAGE);
          expect(res.body.list[0].question).to.equal(questionInstance.question);
          expect(res.body.list[0].answer).to.equal(questionInstance.answer);
          expect(res.body.list[0].category).to.equal(category);
          done();
        })
        .catch(done);
    });
  });

  describe('Update Question', function() {
    it(`should update question failure when id isn't exist`, function(done) {
      request(app)
        .put(api + '/' + questionInstance.nonExistId)
        .send({
          question: questionInstance.question,
          answer: questionInstance.answer,
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
        .put(api + '/' + questionInstanceId)
        .send({
          answer: questionInstance.updateAnswer,
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
        .put(api + '/' + questionInstanceId)
        .send({
          question: questionInstance.updateQuestion,
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
        .put(api + '/' + questionInstanceId)
        .send({
          answer: questionInstance.updateAnswer,
          question: questionInstance.updateQuestion,
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
        .put(api + '/' + questionInstanceId)
        .send({
          question: questionInstance.updateQuestion,
          answer: questionInstance.updateAnswer,
          category: category,
        })
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QUESTION_UPDATE_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.QUESTION_UPDATE_SUCCESS_MESSAGE);
          expect(res.body.list[0].id).to.equal(questionInstanceId);
          expect(res.body.list[0].question).to.equal(questionInstance.updateQuestion);
          expect(res.body.list[0].answer).to.equal(questionInstance.updateAnswer);
          expect(res.body.list[0].category).to.equal(category);
          done();
        })
        .catch(done);
    });
  });

  describe('Remove Question', function() {
    it(`should delete question failure when id isn't exist`, function(done) {
      request(app)
        .delete(api + '/' + questionInstance.nonExistId)
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
        .delete(api + '/' + questionInstanceId)
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
