const Review = require('../models/Review');
const Game = require('../models/Game');
const User = require('../models/User');
const AppError = require('../utils/AppError');

module.exports = {
  // Criar Review
  async store(req, res) {
    const { game_id } = req.params;
    const { rating, comment } = req.body;
    const user_id = req.userId; // Vem do Token

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

  // Listar Reviews de um Jogo
  async index(req, res) {
    const { game_id } = req.params;

    const reviews = await Review.findAll({
      where: { game_id },
      include: [
        { 
          model: User, 
          as: 'user', 
          attributes: ['id', 'name', 'avatar'] 
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return res.json(reviews);
  }
};