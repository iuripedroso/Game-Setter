const { Sequelize } = require('sequelize');
const dbConfig = require('../../config/database'); 

const User = require('../models/User');
const Game = require('../models/Game');
const Review = require('../models/Review');

const connection = new Sequelize(dbConfig);

const models = [User, Game, Review];

models.forEach((model) => model.init(connection));

models.forEach((model) => {
  if (model.associate) {
    model.associate(connection.models);
  }
});

const setupDatabase = async () => {
  try {
    await connection.authenticate();
    console.log('PostgreSQL conectado com sucesso!');
  } catch (error) {
    console.error('Falha ao conectar no Postgres:', error);
  }
};

setupDatabase();

module.exports = connection;