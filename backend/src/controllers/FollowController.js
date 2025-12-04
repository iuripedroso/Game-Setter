const User = require('../models/User');
const AppError = require('../utils/AppError');

module.exports = {
  async toggleFollow(req, res) {
    const { user_id } = req.params;
    const followerId = req.userId; 

    if (user_id === followerId) {
      throw new AppError('Você não pode seguir a si mesmo.');
    }

    const userToFollow = await User.findByPk(user_id);
    if (!userToFollow) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const me = await User.findByPk(followerId);

    const isFollowing = await me.hasFollowing(userToFollow);

    if (isFollowing) {
      await me.removeFollowing(userToFollow);
      return res.status(204).send();
    } else {
      await me.addFollowing(userToFollow);
      return res.status(201).send();
    }
  },

  async listFollowing(req, res) {
    const { user_id } = req.params;
    
    const user = await User.findByPk(user_id, {
      include: [
        { 
          association: 'following', 
          attributes: ['id', 'name', 'avatar'],
          through: { attributes: [] } 
        }
      ]
    });

    if (!user) throw new AppError('Usuário não encontrado.', 404);

    return res.json(user.following);
  },

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