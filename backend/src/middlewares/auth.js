const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O header vem como "Bearer eyJhbGci..."
  // Quebramos pelo espaço e pegamos só o token
  const [, token] = authHeader.split(' ');

  try {
    // Decodifica o token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Coloca o ID do usuário dentro da requisição para as próximas rotas usarem
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};