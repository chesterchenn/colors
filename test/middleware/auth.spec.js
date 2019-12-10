const request = require('supertest');
const app = require('../../index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const instance = require('../instance');
const sinon = require('sinon');
const auth = require('../../middleware/auth');

describe('AUTH MIDDLEWARE TESTS', function() {
  before(function() {
    sinon.stub(console, "error");
    sinon.stub(console, "log");
  });

  describe('Auth verify', function() {
    it('should auth failure when no token', function(done) {
      request(app)
        .get('/')
        .expect(401)
        .then(function(res) {
          expect(res.body.code).to.eq(MESSAGE.AUTH_NO_TOKEN_CODE);
          expect(res.body.message).to.eq(MESSAGE.AUTH_NO_TOKEN_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should auth failure when token expired', function(done) {
      request(app)
        .get('/')
        .set('authorization', 'Bearer ' + instance.expiredToken)
        .expect(400)
        .then(function(res) {
          expect(res.body.code).to.eq(MESSAGE.AUTH_INVALID_TOKEN_CODE);
          expect(res.body.message).to.eq(MESSAGE.AUTH_INVALID_TOKEN_MESSAGE);
          done();
        })
        .catch(done);
    });

    it('should auth success', function() {
      const spy = sinon.spy();
      auth({
        headers: {authorization: 'Bearer ' + instance.token}
      }, {}, spy);
      expect(spy.calledOnce).to.eq(true);
    });
  });

  after(function() {
    sinon.restore();
  });
});
