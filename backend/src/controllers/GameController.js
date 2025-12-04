const Game = require('../models/Game');
const AppError = require('../utils/AppError');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    const { title } = req.query;

    const where = {};

    if (title) {
      where.title = { [Op.iLike]: `%${title}%` };
    }

    const games = await Game.findAll({
      where,
      order: [['title', 'ASC']]
    });

    return res.json(games);
  },

  async store(req, res) {
    const { title, description, publisher, release_date, cover_url } = req.body;

    const gameExists = await Game.findOne({ where: { title } });

    if (gameExists) {
      throw new AppError('Jogo já cadastrado.');
    }

    const game = await Game.create({
      title,
      description,
      publisher,
      release_date,
      cover_url
    });

    return res.status(201).json(game);
  },

  async show(req, res) {
    const { id } = req.params;
    const game = await Game.findByPk(id);

    if (!game) {
      throw new AppError('Jogo não encontrado.', 404);
    }

    return res.json(game);
  }
};