/**
 * 当前用户是否为管理员
 */
const MESSAGE = require('../MESSAGE');
const checkRole = (req, res, next) => {
  if (req.user.role !== 0) {
    return res.status(403).send({
      code: MESSAGE.CHECKROLE_FORBIDDEN_CODE,
      message: MESSAGE.CHECKROLE_FORBIDDEN_MESSAGE,
    });
  }
  return next();
};

module.exports = checkRole;
