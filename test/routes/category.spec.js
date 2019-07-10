const request = require('supertest');
const app = require('../../src/index');
const expect = require('chai').expect;

describe('Category API test case: ', function() {
  describe('Get category', function() {
    it('respose with json', function(done) {
      request(app)
        .get('/category')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });
  });

  describe('Post category', function() {
    it('respose with json', function(done) {
      request(app)
        .post('/category')
        .send({name: 'Test', cname: '测试'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.list[0].name).to.equal('Test');
          expect(res.body.list[0].cname).to.equal('测试');
          done();
        });
    });
  });

  // describe('Put Category', function() {
  //   it('should update a category', function() {
  //     request(app)
  //       .put('/category/'+'');
  //   });
  // });
});
