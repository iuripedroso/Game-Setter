const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    // 1. Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    // 2. Verificar se a senha bate (usando o método que criamos no Model)
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const { id, name, avatar } = user;

    // 3. Gerar o Token JWT
    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
      },
      token: jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    });
  }
};