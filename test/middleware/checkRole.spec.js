const expect = require('chai').expect;
const MESSAGE = require('../../MESSAGE.json');
const sinon = require('sinon');
const checkRole = require('../../middleware/checkRole');

describe('MIDDLEWARE/CHECKROLE TEST CASES', function() {
  describe('Check the role', function() {
    it('should failure when the role is user', function() {
      const spy = sinon.spy();
      const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns(res);
        return res;
      }
      var res = mockResponse();
      checkRole({
        user: { role: 1, }
      }, res, spy);
      expect(res.status.calledWith(403)).to.eq(true);
      expect(res.send.calledWith({
        code: MESSAGE.CHECKROLE_FORBIDDEN_CODE,
        message: MESSAGE.CHECKROLE_FORBIDDEN_MESSAGE,
      })).to.eq(true);
      expect(spy.calledOnce).to.eq(false);
    })

    it('should success when the role is admin', function() {
      const spy = sinon.spy();
      checkRole({user: { role: 0, }}, {}, spy);
      expect(spy.calledOnce).to.eq(true);
    })
  });
});
