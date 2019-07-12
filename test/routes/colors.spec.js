const request = require('supertest');
const app = require('../../src/index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');

describe('Colors API test case: ', function() {
  describe('Get Colors', function() {
    it('should get colors list', function() {
      request(app)
      .get('/colors')
      .expect(200)
      .end(function(err, res) {
        if (err) return err;
        expect(res.body.code).eq(MESSAGE.COLORS_READ_SUCCESS_CODE);
        expect(res.body.message).eq(MESSAGE.COLORS_READ_SUCCESS_MESSAGE);
      })
    })
  })
})
