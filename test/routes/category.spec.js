const request = require('supertest');
const app = require('../../src/index');
const expect = require('chai').expect;
const instance = require('../instance');
const MESSAGE = require('../../MESSAGE.json');

describe('Category API test case: ', function() {
  let instanceId = '';

  describe('Get category', function() {
    it('should read category', function(done) {
      request(app)
        .get('/category')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.code).eq(MESSAGE.CATEGORY_READ_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_READ_SUCCESS_MESSAGE);
          done();
        });
    });
  });

  describe('Post category', function() {
    it('should create category', function(done) {
      request(app)
        .post('/category')
        .send({
          name: instance.category.name,
          cname: instance.category.cname,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          instanceId = res.body.list[0].id;
          expect(res.body.code).eq(MESSAGE.CATEGORY_ADD_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_ADD_SUCCESS_MESSAGE);
          expect(res.body.list[0].name).to.equal(instance.category.name);
          expect(res.body.list[0].cname).to.equal(instance.category.cname);
          done();
        });
    });

    it('should create category failure when missing name', function(done) {
      request(app)
        .post('/category')
        .send({
          cname: instance.category.cname,
        })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.code).eq(MESSAGE.CATEGORY_ADD_NAME_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_ADD_NAME_MESSAGE);
          done();
        })
    })

    it('should create category failure when missing cname', function(done) {
      request(app)
        .post('/category')
        .send({
          name: instance.category.name,
        })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.code).eq(MESSAGE.CATEGORY_ADD_CNAME_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_ADD_CNAME_MESSAGE);
          done();
        })
    })
  });

  describe('Put Category', function() {
    it(`should update category failure when id isn't exist`, function(done) {
      request(app)
        .put('/category/' + instance.category.nonExistId)
        .send({
          name: instance.category.updateName,
          cname: instance.category.updateCname,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.code).eq(MESSAGE.CATEGORY_UPDATE_ID_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_UPDATE_ID_MESSAGE);
          done();
        });
    });

    it(`should update category failure when missing name`, function(done) {
      request(app)
        .put('/category/' + instanceId)
        .send({
          cname: instance.category.updateCname,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.code).eq(MESSAGE.CATEGORY_UPDATE_NAME_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_UPDATE_NAME_MESSAGE);
          done();
        });
    });

    it(`should update category failure when missing cname`, function(done) {
      request(app)
        .put('/category/' + instanceId)
        .send({
          name: instance.category.updateName,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.code).eq(MESSAGE.CATEGORY_UPDATE_CNAME_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_UPDATE_CNAME_MESSAGE);
          done();
        });
    });

    it(`should update category success`, function(done) {
      request(app)
        .put('/category/' + instanceId)
        .send({
          name: instance.category.updateName,
          cname: instance.category.updateCname,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.list[0].id).to.equal(instanceId);
          expect(res.body.list[0].name).to.equal(instance.category.updateName);
          expect(res.body.list[0].cname).to.equal(instance.category.updateCname);
          done();
        });
    });
  });

  describe('Remove Category', function() {
    it(`should delete category failure when id isn't exist`, function(done) {
      request(app)
        .delete('/category/' + instance.category.nonExistId)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.message).to.eq(MESSAGE.CATEGORY_DELETE_ID_MESSAGE);
          expect(res.body.code).to.eq(MESSAGE.CATEGORY_DELETE_ID_CODE);
          done();
        })
    })

    it('should delete category success', function(done) {
      request(app)
        .delete('/category/' + instanceId)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.message).to.eq(MESSAGE.CATEGORY_DELETE_SUCCESS_MESSAGE);
          expect(res.body.code).to.eq(MESSAGE.CATEGORY_DELETE_SUCCESS_CODE);
          done();
        })
    })
  })
});
