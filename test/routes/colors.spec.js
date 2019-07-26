const request = require('supertest');
const app = require('../../src/index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const colorInstance = require('../instance').color;
const categoryInstance = require('../instance').category;

describe('Colors API test case: ', function() {
  let categoryId;
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
