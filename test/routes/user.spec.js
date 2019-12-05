const request = require('supertest');
const app = require('../../index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const instance = require('../instance');
const api = '/user';

describe('USER API TEST', function() {
  describe('Read user list', function() {
    it('should read user list success', function(done) {
      request(app)
        .get(api)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_READ_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.USER_READ_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  })
})
