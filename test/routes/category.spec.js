const request = require('supertest');
const app = require('../../src/index');
const expect = require('chai').expect;
const instance = require('../instance');

describe('Category API test case: ', function() {
  let instanceId = '';

  describe('Get category', function() {
    it('should read category', function(done) {
      request(app)
        .get('/category')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });
  });

  describe('Post category', function() {
    it('should create a category', function(done) {
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
          expect(res.body.list[0].name).to.equal(instance.category.name);
          expect(res.body.list[0].cname).to.equal(instance.category.cname);
          done();
        });
    });
  });

  describe('Put Category', function() {
    it(`should update the category where id = ${instanceId}`, function(done) {
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
});
