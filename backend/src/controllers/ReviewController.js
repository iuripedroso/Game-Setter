const Review = require('../models/Review');
const Game = require('../models/Game');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const {Sequelize} = require('sequelize');

module.exports = {
  async store(req, res) {
    const { game_id } = req.params;
    const { rating, comment } = req.body;
    const user_id = req.userId;

    const game = await Game.findByPk(game_id);
    if (!game) {
      throw new AppError('Jogo não encontrado.', 404);
    }

    const review = await Review.create({
      user_id,
      game_id,
      rating,
      comment
    });

    return res.status(201).json(review);
  },

  async index(req, res) {
    const { game_id } = req.params;
    const userId = req.userId; 

    let order = [['created_at', 'DESC']];

    if (userId) {
      const user = await User.findByPk(userId, {
        include: [{ association: 'following', attributes: ['id'] }]
      });

      const followingIds = user.following.map(u => u.id);

      if (followingIds.length > 0) {
        const idsList = followingIds.map(id => `'${id}'`).join(',');

        order = [
          [Sequelize.literal(`CASE WHEN "Review"."user_id" IN (${idsList}) THEN 0 ELSE 1 END`), 'ASC'],
          ['created_at', 'DESC']
        ];
      }
    }

    const reviews = await Review.findAll({
      where: { game_id },
      include: [
        { 
          model: User, 
          as: 'user', 
          attributes: ['id', 'name', 'avatar'] 
        }
      ],
      order: order
    });

    return res.json(reviews);
  },

  async update(req, res) {
    const { id } = req.params; 
    const { rating, comment } = req.body;
    const userId = req.userId;

    const review = await Review.findByPk(id);

    if (!review) {
      throw new AppError('Review não encontrada.', 404);
    }

    if (review.user_id !== userId) {
      throw new AppError('Você só pode editar suas próprias avaliações.', 403);
    }

    review.rating = rating;
    review.comment = comment;
    
    await review.save();

    return res.json(review);
  },

  async delete(req, res) {
    const { id } = req.params;
    const userId = req.userId;

    const review = await Review.findByPk(id);
    if (!review) {
      throw new AppError('Review não encontrada.', 404);
    }

    const userRequesting = await User.findByPk(userId);

    if (review.user_id !== userId && !userRequesting.is_admin) {
      throw new AppError('Você não tem permissão para excluir esta avaliação.', 403);
    }

    await review.destroy();

    return res.status(204).send(); 
  }
};