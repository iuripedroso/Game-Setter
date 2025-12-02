const User = require('../models/User');

module.exports = {
  async create(req, res) {
    // (Não precisa mais de try/catch aqui)
    
    const { name, email, password, biography } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      // Em vez de return res.status(400)... você lança o erro:
      throw new AppError('Usuário já cadastrado.');
    }

    // Se der erro aqui (ex: banco fora do ar), o middleware pega sozinho e dá erro 500
    const user = await User.create({ name, email, password, biography });

    user.password_hash = undefined;
    user.password = undefined;

    return res.status(201).json(user);
  },

  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
};