const request = require('supertest');
const app = require('../../index');
const expect = require('chai').expect;
const instance = require('../instance');
const MESSAGE = require('../../MESSAGE.json');
const api = '/qcategory';

describe('QUESTION CATEGORY API TEST ', function() {
  let instanceId = '';

  describe('Read question category', function() {
    it('should read question category', function(done) {
      request(app)
        .get(api)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QCATEGORY_READ_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.QCATEGORY_READ_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  describe('Create question category', function() {
    it('should create question category failure when missing name', function(done) {
      request(app)
        .post(api)
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QCATEGORY_ADD_NAME_CODE);
          expect(res.body.message).eq(MESSAGE.QCATEGORY_ADD_NAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create question category success', function(done) {
      request(app)
        .post(api)
        .send({
          name: instance.name,
        })
        .expect(200)
        .then(function(res) {
          instanceId = res.body.list[0].id;
          expect(res.body.code).eq(MESSAGE.QCATEGORY_ADD_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.QCATEGORY_ADD_SUCCESS_MESSAGE);
          expect(res.body.list[0].name).to.equal(instance.name);
          done();
        })
        .catch(done);
    });
  });

  describe('Update Category', function() {
    it(`should update question category failure when id isn't exist`, function(done) {
      request(app)
        .put(api + '/' + instance.nonExistId)
        .send({
          name: instance.updateName,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QCATEGORY_UPDATE_ID_CODE);
          expect(res.body.message).eq(MESSAGE.QCATEGORY_UPDATE_ID_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update question category failure when missing name`, function(done) {
      request(app)
        .put(api + '/' + instanceId)
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QCATEGORY_UPDATE_NAME_CODE);
          expect(res.body.message).eq(MESSAGE.QCATEGORY_UPDATE_NAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update question category success`, function(done) {
      request(app)
        .put(api + '/' + instanceId)
        .send({
          name: instance.updateName,
        })
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.QCATEGORY_UPDATE_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.QCATEGORY_UPDATE_SUCCESS_MESSAGE);
          expect(res.body.list[0].id).to.equal(instanceId);
          expect(res.body.list[0].name).to.equal(instance.updateName);
          done();
        })
        .catch(done);
    });
  });

  describe('Delete Category', function() {
    it(`should delete question category failure when id isn't exist`, function(done) {
      request(app)
        .delete(api + '/' + instance.nonExistId)
        .expect(400)
        .then(function(res) {
          expect(res.body.message).to.eq(MESSAGE.QCATEGORY_DELETE_ID_MESSAGE);
          expect(res.body.code).to.eq(MESSAGE.QCATEGORY_DELETE_ID_CODE);
          done();
        })
        .catch(done);
    });

    it('should delete question category success', function(done) {
      request(app)
        .delete(api + '/' + instanceId)
        .expect(200)
        .then(function(res) {
          expect(res.body.message).to.eq(MESSAGE.QCATEGORY_DELETE_SUCCESS_MESSAGE);
          expect(res.body.code).to.eq(MESSAGE.QCATEGORY_DELETE_SUCCESS_CODE);
          done();
        })
        .catch(done);
    });
  });
});
