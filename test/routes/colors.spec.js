const request = require('supertest');
const app = require('../../index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const instance = require('../instance');
const api = '/colors';
const categoryAPI = '/category';

describe('COLORS API TEST', function() {
  let categoryId, colorId;
  /* Create a category to use test */
  before(function() {
    request(app)
      .post(categoryAPI)
      .send({
        name: instance.name,
        cname: instance.cname,
      })
      .then(function(res) {
        categoryId = res.body.list[0].id;
      });
  });

  describe('Read Colors', function() {
    it('should get colors list', function(done) {
      request(app)
        .get(api)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_READ_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_READ_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  describe('Create Colors', function() {
    it('should create colors failure when missing name', function(done) {
      request(app)
        .post(api)
        .send({
          hex: instance.hex,
          cname: instance.cname,
          categoryId: categoryId,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_ADD_NAME_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_ADD_NAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create colors failure when missing cname', function(done) {
      request(app)
        .post(api)
        .send({
          hex: instance.hex,
          name: instance.name,
          categoryId: categoryId,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_ADD_CNAME_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_ADD_CNAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create colors failure when missing hex', function(done) {
      request(app)
        .post(api)
        .send({
          name: instance.name,
          cname: instance.cname,
          categoryId: categoryId,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_ADD_LACKHEX_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_ADD_LACKHEX_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create colors failure when missing category', function(done) {
      request(app)
        .post(api)
        .send({
          hex: instance.hex,
          name: instance.name,
          cname: instance.cname,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_ADD_CATEGORY_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_ADD_CATEGORY_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should create colors success', function(done) {
      request(app)
        .post(api)
        .send({
          hex: instance.hex,
          name: instance.name,
          cname: instance.cname,
          categoryId: categoryId,
        })
        .expect(200)
        .then(function(res) {
          colorId = res.body.list[0].id;
          expect(res.body.code).eq(MESSAGE.COLORS_ADD_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_ADD_SUCCESS_MESSAGE);
          expect(res.body.list[0].hex).to.equal(instance.hex);
          expect(res.body.list[0].name).to.equal(instance.name);
          expect(res.body.list[0].cname).to.equal(instance.cname);
          expect(res.body.list[0].categoryId).to.equal(categoryId);
          done();
        })
        .catch(done);
    });

    it('should create colors failure when hex is exist', function(done) {
      request(app)
        .post(api)
        .send({
          hex: instance.hex,
          name: instance.name,
          cname: instance.cname,
          categoryId: categoryId,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_ADD_HEX_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_ADD_HEX_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  describe('Update Colors', function() {
    it(`should update colors failure when id isn't exist`, function(done) {
      request(app)
        .put(api + '/' + instance.nonExistId)
        .send({
          hex: instance.updateHex,
          name: instance.updateName,
          cname: instance.updateCname,
          categoryId: categoryId,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_UPDATE_ID_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_UPDATE_ID_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update colors failure when missing hex`, function(done) {
      request(app)
        .put(api + '/' + colorId)
        .send({
          name: instance.updateName,
          cname: instance.updateCname,
          categoryId: categoryId,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_UPDATE_LACKHEX_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_UPDATE_LACKHEX_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update colors failure when missing name`, function(done) {
      request(app)
        .put(api + '/' + colorId)
        .send({
          hex: instance.updateHex,
          cname: instance.updateCname,
          categoryId: categoryId,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_UPDATE_NAME_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_UPDATE_NAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update colors failure when missing cname`, function(done) {
      request(app)
        .put(api + '/' + colorId)
        .send({
          hex: instance.updateHex,
          name: instance.updateName,
          categoryId: categoryId,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_UPDATE_CNAME_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_UPDATE_CNAME_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update colors failure when missing category`, function(done) {
      request(app)
        .put(api + '/' + colorId)
        .send({
          hex: instance.updateHex,
          name: instance.updateName,
          cname: instance.updateCname,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_UPDATE_CATEGORY_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_UPDATE_CATEGORY_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should update colors success`, function(done) {
      request(app)
        .put(api + '/' + colorId)
        .send({
          hex: instance.updateHex,
          name: instance.updateName,
          cname: instance.updateCname,
          categoryId: categoryId,
        })
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_UPDATE_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_UPDATE_SUCCESS_MESSAGE);
          expect(res.body.list[0].id).to.equal(colorId);
          expect(res.body.list[0].hex).to.equal(instance.updateHex);
          expect(res.body.list[0].name).to.equal(instance.updateName);
          expect(res.body.list[0].cname).to.equal(instance.updateCname);
          expect(res.body.list[0].categoryId).to.equal(categoryId);
          done();
        })
        .catch(done);
    });
  });

  describe('Delete Colors', function() {
    it(`should delete colors failure when id isn't exist`, function(done) {
      request(app)
        .delete(api + '/' + instance.nonExistId)
        .expect(400)
        .then(function(res) {
          expect(res.body.code).to.eq(MESSAGE.COLORS_DELETE_ID_CODE);
          expect(res.body.message).to.eq(MESSAGE.COLORS_DELETE_ID_MESSAGE);
          done();
        })
        .catch(done);
    });

    it(`should delete colors success`, function(done) {
      request(app)
        .delete(api + '/' + colorId)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).to.eq(MESSAGE.COLORS_DELETE_SUCCESS_CODE);
          expect(res.body.message).to.eq(MESSAGE.COLORS_DELETE_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  /* Delete the category */
  after(function(done) {
    request(app)
      .delete(categoryAPI + '/' + categoryId)
      .then(function() {
        done();
      })
      .catch(done);
  });
});
