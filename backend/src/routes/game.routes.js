const express = require('express');
const GameController = require('../controllers/GameController'); // Importa o objeto
const authMiddleware = require('../middlewares/auth');
const ensureAdmin = require('../middlewares/ensureAdmin');

const gameRouter = express.Router();

// Rota GET /games -> Chama GameController.index
gameRouter.get('/', GameController.index); 

// Rota GET /games/:id -> Chama GameController.show
gameRouter.get('/:id', GameController.show);

// Rota POST /games -> Chama GameController.store (Protegida)
gameRouter.post('/', authMiddleware, ensureAdmin, GameController.store);

module.exports = gameRouter;