const request = require('supertest');
const app = require('../../index');
const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const instance = require('../instance');
const User = require('../../db/userSequelize');
const api = '/user';
const sinon = require('sinon');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

describe('USER API TEST', function() {
  before(function() {
    sinon.stub(console, "error");
    User.destroy({
      where: {
        user: {
          [Op.ne]: 'admin',
        }
      },
    });
  });

  let userId = '';
  describe('Create user', function() {
    it('should create user success', function(done) {
      request(app)
        .post(api)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          user: instance.name,
          password: instance.password,
        })
        .expect(200)
        .then(function(res) {
          userId = res.body.list[0].id;
          expect(res.body.code).eq(MESSAGE.USER_ADD_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.USER_ADD_SUCCESS_MESSAGE);
          expect(res.body.list[0].user).to.equal(instance.name);
          done();
        })
        .catch(done);
    });
    it('should create user failure when no user', function(done) {
      request(app)
        .post(api)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          password: instance.password,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_ADD_NO_USER_CODE);
          expect(res.body.message).eq(MESSAGE.USER_ADD_NO_USER_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should create user failure when no password', function(done) {
      request(app)
        .post(api)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          user: instance.name,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_ADD_NO_PASSWD_CODE);
          expect(res.body.message).eq(MESSAGE.USER_ADD_NO_PASSWD_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should create user failure when password length too short', function(done) {
      request(app)
        .post(api)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          user: instance.name,
          password: instance.shortPasswd,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_ADD_PASSWD_LENGTH_CODE);
          expect(res.body.message).eq(MESSAGE.USER_ADD_PASSWD_LENGTH_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should create user failure when user is exist', function(done) {
      request(app)
        .post(api)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          user: instance.name,
          password: instance.password,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_ADD_USER_EXIST_CODE);
          expect(res.body.message).eq(MESSAGE.USER_ADD_USER_EXIST_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  describe('Read user list', function() {
    it('should read user list success', function(done) {
      request(app)
        .get(api)
        .set('authorization', 'Bearer ' + instance.token)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_READ_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.USER_READ_SUCCESS_MESSAGE);
          // expect(res.body.list[0].user).to.equal(instance.name);
          done();
        })
        .catch(done);
    });
  });

  describe('Update user', function() {
    it('should update password failure when user is not exist', function(done) {
      request(app)
        .put(api + '/' + instance.nonExistId)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          oldPassword: instance.password,
          password: instance.updatePassword,
          confirmPassword: instance.updatePassword,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_UPDATE_USER_NO_EXIST_CODE);
          expect(res.body.message).eq(MESSAGE.USER_UPDATE_USER_NO_EXIST_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should update password failure when no old password', function(done) {
      request(app)
        .put(api + '/' + userId)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          password: instance.updatePd,
          confirmPassword: instance.updatePd,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_UPDATE_OLD_PASSWD_CODE);
          expect(res.body.message).eq(MESSAGE.USER_UPDATE_OLD_PASSWD_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should update password failure when no new password', function(done) {
      request(app)
        .put(api + '/' + userId)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          oldPassword: instance.password,
          confirmPassword: instance.updatePd,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_UPDATE_NEW_PASSWD_CODE);
          expect(res.body.message).eq(MESSAGE.USER_UPDATE_NEW_PASSWD_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should update password failure when new password too short', function(done) {
      request(app)
        .put(api + '/' + userId)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          oldPassword: instance.password,
          password: instance.shortPasswd,
          confirmPassword: instance.shortPasswd,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_UPDATE_NEW_PASSWD_LENGTH_CODE);
          expect(res.body.message).eq(MESSAGE.USER_UPDATE_NEW_PASSWD_LENGTH_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should update password failure when new password was difference', function(done) {
      request(app)
        .put(api + '/' + userId)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          oldPassword: instance.password,
          password: instance.updatePassword,
          confirmPassword: instance.password,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_UPDATE_NEW_PASSWD_DIFF_CODE);
          expect(res.body.message).eq(MESSAGE.USER_UPDATE_NEW_PASSWD_DIFF_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should update password failure when old password was error', function(done) {
      request(app)
        .put(api + '/' + userId)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          oldPassword: instance.updatePassword,
          password: instance.updatePassword,
          confirmPassword: instance.updatePassword,
        })
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_UPDATE_OLD_PASSWD_COMPARE_CODE);
          expect(res.body.message).eq(MESSAGE.USER_UPDATE_OLD_PASSWD_COMPARE_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should update password success', function(done) {
      request(app)
        .put(api + '/' + userId)
        .set('authorization', 'Bearer ' + instance.token)
        .send({
          oldPassword: instance.password,
          password: instance.updatePassword,
          confirmPassword: instance.updatePassword,
        })
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_UPDATE_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.USER_UPDATE_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  describe('Remove User', function() {
    it('should delete user failure when user is not exist', function(done) {
      request(app)
        .delete(api + '/' + instance.nonExistId)
        .set('authorization', 'Bearer ' + instance.token)
        .expect(400)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_DELETE_ID_CODE);
          expect(res.body.message).eq(MESSAGE.USER_DELETE_ID_MESSAGE);
          done();
        })
        .catch(done);
    });
    it('should delete user success', function(done) {
      request(app)
        .delete(api + '/' + userId)
        .set('authorization', 'Bearer ' + instance.token)
        .expect(200)
        .then(function(res) {
          expect(res.body.code).eq(MESSAGE.USER_DELETE_SUCCESS_CODE);
          expect(res.body.message).eq(MESSAGE.USER_DELETE_SUCCESS_MESSAGE);
          done();
        })
        .catch(done);
    });
  });

  after(function() {
    sinon.restore();
  });
});
