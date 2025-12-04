const express = require('express');
const GameController = require('../controllers/GameController'); // Importa o objeto
const authMiddleware = require('../middlewares/auth');
const ensureAdmin = require('../middlewares/ensureAdmin');

const gameRouter = express.Router();

gameRouter.get('/', GameController.index); 

gameRouter.get('/:id', GameController.show);

gameRouter.post('/', authMiddleware, ensureAdmin, GameController.store);

module.exports = gameRouter;