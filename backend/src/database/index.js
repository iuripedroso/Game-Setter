const { Sequelize } = require('sequelize');
const dbConfig = require('../../config/database'); // Pega as configs que fizemos pro CLI

const User = require('../models/User');
const Game = require('../models/Game');
const Review = require('../models/Review');

// Cria a conexão usando as configurações do arquivo
const connection = new Sequelize(dbConfig);

const models = [User, Game, Review];

// 1. Inicializa os models na conexão
models.forEach((model) => model.init(connection));

// 2. Faz as associações (Relacionamentos) se existirem
models.forEach((model) => {
  if (model.associate) {
    model.associate(connection.models);
  }
});

// 3. Testa a conexão (Opcional, mas bom pra debug)
const setupDatabase = async () => {
  try {
    await connection.authenticate();
    console.log('🐘 PostgreSQL conectado com sucesso!');
  } catch (error) {
    console.error('❌ Falha ao conectar no Postgres:', error);
  }
};

setupDatabase();

module.exports = connection;