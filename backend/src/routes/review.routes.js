const express = require('express');
const ReviewController = require('../controllers/ReviewController');
const authMiddleware = require('../middlewares/auth');
const optionalAuth = require('../middlewares/optionalAuth');
const validateId = require('../middlewares/validateId');

const reviewRouter = express.Router();

reviewRouter.post('/games/:game_id', authMiddleware,validateId, ReviewController.store);

reviewRouter.get('/games/:game_id',optionalAuth,validateId, ReviewController.index);

reviewRouter.put('/:id', authMiddleware, validateId, ReviewController.update);

reviewRouter.delete('/:id', authMiddleware, validateId, ReviewController.delete);

module.exports = reviewRouter;