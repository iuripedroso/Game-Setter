const { validate: isUuid } = require('uuid');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const paramsToCheck = ['id', 'user_id', 'game_id'];

  for (const param of paramsToCheck) {
    if (req.params[param] && !isUuid(req.params[param])) {
      throw new AppError(`ID inválido no parâmetro: ${param}.`, 400);
    }
  }

  return next();
};