const request = require('supertest');
const app = require('../../index');
const expect = require('chai').expect;
const instance = require('../instance');
const MESSAGE = require('../../MESSAGE.json');
const Category = require('../../db/categorySequelize');
const api = '/category';

describe('CATEGORY API TEST', function() {
  before(function() {
    Category.destroy({
      where: {},
    });
  });

  let instanceId = '';
  describe('Read category list', function() {
    it('should read category', function(done) {
      request(app)
        .get(api)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.CATEGORY_READ_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_READ_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  describe('Create category', function() {
    it('should create category failure when missing name', function(done) {
      request(app)
        .post(api)
        .send({
          cname: instance.cname,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.CATEGORY_ADD_NAME_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_ADD_NAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create category failure when missing cname', function(done) {
      request(app)
        .post(api)
        .send({
          name: instance.name,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.CATEGORY_ADD_CNAME_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_ADD_CNAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create category success', function(done) {
      request(app)
        .post(api)
        .send({
          name: instance.name,
          cname: instance.cname,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function(res) {
          instanceId = res.body.list[0].id;
          expect(res.body.code).eq(MESSAGE.CATEGORY_ADD_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_ADD_SUCCESS_MESSAGE);
          expect(res.body.list[0].name).to.equal(instance.name);
          expect(res.body.list[0].cname).to.equal(instance.cname);
          done();
        })
        .catch(done);
    });
  });

  describe('Update Category', function() {
    it(`should update category failure when id isn't exist`, function(done) {
      request(app)
        .put(api + '/' + instance.nonExistId)
        .send({
          name: instance.updateName,
          cname: instance.updateCname,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.CATEGORY_UPDATE_ID_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_UPDATE_ID_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update category failure when missing name`, function(done) {
      request(app)
        .put(api + '/' + instanceId)
        .send({
          cname: instance.updateCname,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.CATEGORY_UPDATE_NAME_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_UPDATE_NAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update category failure when missing cname`, function(done) {
      request(app)
        .put(api + '/' + instanceId)
        .send({
          name: instance.updateName,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.CATEGORY_UPDATE_CNAME_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_UPDATE_CNAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update category success`, function(done) {
      request(app)
        .put(api + '/' + instanceId)
        .send({
          name: instance.updateName,
          cname: instance.updateCname,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.CATEGORY_UPDATE_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_UPDATE_SUCCESS_MESSAGE);
          expect(res.body.list[0].id).to.equal(instanceId);
          expect(res.body.list[0].name).to.equal(instance.updateName);
          expect(res.body.list[0].cname).to.equal(instance.updateCname);
          done();
        })
        .catch(done);
    });
  });

  describe('Remove Category', function() {
    it(`should delete category failure when id isn't exist`, function(done) {
      request(app)
        .delete(api + '/' + instance.nonExistId)
        .expect(400)
        .then(function(res) {
          expect(res.body.message).to.eq(MESSAGE.CATEGORY_DELETE_ID_MESSAGE);
          expect(res.body.code).to.eq(MESSAGE.CATEGORY_DELETE_ID_CODE);
          done();
        })
        .catch(done);
    });

    it('should delete category success', function(done) {
      request(app)
        .delete(api + '/' + instanceId)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function(res) {
          expect(res.body.message).to.eq(MESSAGE.CATEGORY_DELETE_SUCCESS_MESSAGE);
          expect(res.body.code).to.eq(MESSAGE.CATEGORY_DELETE_SUCCESS_CODE);
          done();
        })
        .catch(done);
    });
  });
});
