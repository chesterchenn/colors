const request = require('supertest');
const app = require('../../index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const instance = require('../instance');
const User = require('../../db/userSequelize');
const api = '/login';
const sinon = require('sinon');
const userApi = '/user';

describe('LOGIN API TEST', function() {
  before(function(done) {
    sinon.stub(console, "error");
    User.destroy({
      where: {},
    });
    request(app)
      .post(userApi)
      .send({
        user: instance.name,
        password: instance.password,
      })
      .then(function() {
        done();
      })
  });

  describe('Login', function() {
    it('should login failure when no user', function(done) {
      request(app)
        .post(api)
        .send({
          password: instance.password,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.LOGIN_READ_FAILURE_CODE);
          expect(res.body.message).eq(MESSAGE.LOGIN_READ_FAILURE_MESSAGE);
          done();
        })
        .catch(done)
    });
    it('should login failure when no password', function(done) {
      request(app)
        .post(api)
        .send({
          user: instance.name,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.LOGIN_READ_FAILURE_CODE);
          expect(res.body.message).eq(MESSAGE.LOGIN_READ_FAILURE_MESSAGE);
          done();
        })
        .catch(done)
    });
    it('should login failure when password is error', function(done) {
      request(app)
        .post(api)
        .send({
          user: instance.name,
          password: instance.updatePassword,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.LOGIN_READ_FAILURE_CODE);
          expect(res.body.message).eq(MESSAGE.LOGIN_READ_FAILURE_MESSAGE);
          done();
        })
        .catch(done)
    });
    it('should login success', function(done) {
      request(app)
        .post(api)
        .send({
          user: instance.name,
          password: instance.password,
        })
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.LOGIN_READ_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.LOGIN_READ_SUCCESS_MESSAGE);
          done();
        })
        .catch(err => {
          console.log(err);
          done(err);
        })
    });
  })

  after(function() {
    User.destroy({
      where: {},
    });
    sinon.restore();
  })
});
