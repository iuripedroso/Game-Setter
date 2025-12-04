const User = require('../models/User');

module.exports = {
  async create(req, res) {
    
    const { name, email, password, biography } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new AppError('Usuário já cadastrado.');
    }

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