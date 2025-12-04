const express = require('express');
const userRouter = require('./user.routes');
const sessionRouter = require('./session.routes');
const gameRouter = require('./game.routes');
const reviewRouter = require('./review.routes');

const routes = express.Router();

routes.use('/users', userRouter); 
routes.use('/sessions', sessionRouter);
routes.use('/games',gameRouter);
routes.use('/reviews', reviewRouter);

routes.get('/', (req, res) => {
    res.json({ message: 'Game Setter API Online ' });
});

module.exports = routes;