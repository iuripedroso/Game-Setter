module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false, // Nota é obrigatória (0 a 5, ou 0 a 100)
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true, // Comentário pode ser opcional
      },
      // Chave Estrangeira: Usuário
      user_id: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se deletar o usuário, deleta as reviews dele
        allowNull: false,
      },
      // Chave Estrangeira: Jogo
      game_id: {
        type: Sequelize.UUID,
        references: { model: 'games', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};