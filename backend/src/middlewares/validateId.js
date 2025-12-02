const { validate: isUuid } = require('uuid');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  // Lista de nomes de parâmetros que costumamos usar para IDs
  const paramsToCheck = ['id', 'user_id', 'game_id'];

  for (const param of paramsToCheck) {
    // Se o parâmetro existe na URL e NÃO é um UUID válido
    if (req.params[param] && !isUuid(req.params[param])) {
      throw new AppError(`ID inválido no parâmetro: ${param}.`, 400);
    }
  }

  return next();
};