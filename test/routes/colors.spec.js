const request = require('supertest');
const app = require('../../src/index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const colorInstance = require('../instance').color;
const categoryInstance = require('../instance').category;

describe('Colors API test case: ', function() {
  let categoryId, colorInstanceId;
  /* Create a category to use test */
  before(function() {
    request(app)
      .post('/category')
      .send({
        name: categoryInstance.name,
        cname: categoryInstance.cname,
      })
      .then(function(res) {
        categoryId = res.body.list[0].id;
      });
  });

  describe('Get Colors', function() {
    it('should get colors list', function(done) {
      request(app)
        .get('/colors')
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.COLORS_READ_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_READ_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  describe('Post Colors', function() {
    it('should create colors failure when missing name', function(done) {
      request(app)
        .post('/colors')
        .send({
          hex: colorInstance.hex,
          cname: colorInstance.cname,
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
        .post('/colors')
        .send({
          hex: colorInstance.hex,
          name: colorInstance.name,
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
        .post('/colors')
        .send({
          name: colorInstance.name,
          cname: colorInstance.cname,
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
        .post('/colors')
        .send({
          hex: colorInstance.hex,
          name: colorInstance.name,
          cname: colorInstance.cname,
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
        .post('/colors')
        .send({
          hex: colorInstance.hex,
          name: colorInstance.name,
          cname: colorInstance.cname,
          categoryId: categoryId,
        })
        .expect(200)
        .then(function(res) {
          colorInstanceId = res.body.list[0].id;
          expect(res.body.code).eq(MESSAGE.COLORS_ADD_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.COLORS_ADD_SUCCESS_MESSAGE);
          expect(res.body.list[0].hex).to.equal(colorInstance.hex);
          expect(res.body.list[0].name).to.equal(colorInstance.name);
          expect(res.body.list[0].cname).to.equal(colorInstance.cname);
          expect(res.body.list[0].categoryId).to.equal(categoryId);
          done();
        })
        .catch(done);
    });

    it('should create colors failure when hex is exist', function(done) {
      request(app)
        .post('/colors')
        .send({
          hex: colorInstance.hex,
          name: colorInstance.name,
          cname: colorInstance.cname,
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

  describe('Put Colors', function() {
    it(`should update colors failure when id isn't exist`, function(done) {
      request(app)
        .put('/category/' + colorInstance.nonExistId)
        .send({
          hex: colorInstance.hex,
          name: colorInstance.updateName,
          cname: colorInstance.updateCname,
          categoryId: categoryId,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.CATEGORY_UPDATE_ID_CODE);
          expect(res.body.message).eq(MESSAGE.CATEGORY_UPDATE_ID_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  describe('Remove Colors', function() {
    it(`should delete colors success`, function(done) {
      request(app)
        .delete('/colors/' + colorInstanceId)
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
      .delete('/category/' + categoryId)
      .then(function() {
        done()
      })
      .catch(done)
  })
});
