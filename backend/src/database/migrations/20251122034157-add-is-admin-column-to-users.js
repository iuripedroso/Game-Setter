module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'is_admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // Todo mundo nasce usuário comum
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'is_admin');
  }
};