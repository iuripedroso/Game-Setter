const User = require('../models/User');
const AppError = require('../utils/AppError');

module.exports = async (req, res, next) => {
  const { userId } = req;

  const user = await User.findByPk(userId);

  if (!user.is_admin) {
    throw new AppError('Acesso negado. Apenas administradores podem realizar esta ação.', 403);
  }

  return next();
};