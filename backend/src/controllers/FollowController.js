const User = require('../models/User');
const AppError = require('../utils/AppError');

module.exports = {
  // Seguir ou Deixar de Seguir (Toggle)
  async toggleFollow(req, res) {
    const { user_id } = req.params; // ID de quem eu quero seguir
    const followerId = req.userId;  // Meu ID (do token)

    if (user_id === followerId) {
      throw new AppError('Você não pode seguir a si mesmo.');
    }

    const userToFollow = await User.findByPk(user_id);
    if (!userToFollow) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const me = await User.findByPk(followerId);

    // Verifica se já sigo
    const isFollowing = await me.hasFollowing(userToFollow);

    if (isFollowing) {
      await me.removeFollowing(userToFollow);
      return res.status(204).send(); // 204 = No Content (Sucesso sem corpo)
    } else {
      await me.addFollowing(userToFollow);
      return res.status(201).send();
    }
  },

  // Listar quem o usuário segue
  async listFollowing(req, res) {
    const { user_id } = req.params;
    
    const user = await User.findByPk(user_id, {
      include: [
        { 
          association: 'following', 
          attributes: ['id', 'name', 'avatar'],
          through: { attributes: [] } // Não trazer dados da tabela pivô
        }
      ]
    });

    if (!user) throw new AppError('Usuário não encontrado.', 404);

    return res.json(user.following);
  },

  // Listar seguidores do usuário
  async listFollowers(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: [
        { 
          association: 'followers', 
          attributes: ['id', 'name', 'avatar'],
          through: { attributes: [] }
        }
      ]
    });

    if (!user) throw new AppError('Usuário não encontrado.', 404);

    return res.json(user.followers);
  }
};