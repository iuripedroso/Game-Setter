const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.userId = null;
    return next();
  }

  try {
    const [, token] = authHeader.split(' ');
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
  } catch (err) {
    req.userId = null;
  }

  return next();
};