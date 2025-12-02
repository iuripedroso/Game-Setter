const express = require('express');
const SessionController = require('../controllers/SessionController');

const sessionRouter = express.Router();

sessionRouter.post('/', SessionController.store);

module.exports = sessionRouter;