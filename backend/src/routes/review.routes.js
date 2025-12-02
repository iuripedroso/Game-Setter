const express = require('express');
const ReviewController = require('../controllers/ReviewController');
const authMiddleware = require('../middlewares/auth');

const reviewRouter = express.Router();

// POST: Precisa estar logado para avaliar
reviewRouter.post('/games/:game_id', authMiddleware, ReviewController.store);

// GET: Qualquer um pode ver as avaliações
reviewRouter.get('/games/:game_id', ReviewController.index);

module.exports = reviewRouter;