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

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: { exclude: ['password_hash'] } // Segurança: não devolve a senha
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: 'ID inválido ou erro na busca.' });
    }
  },

  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async update(req, res) {
  // Pega o ID do usuário logado pelo token
  const { userId } = req; 
  const { name, biography } = req.body;

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Atualiza apenas os campos enviados
  await user.update({ name, biography });

  return res.json({ id: user.id, name: user.name, biography: user.biography });
}
};