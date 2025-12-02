const { Model, DataTypes } = require('sequelize');

class Review extends Model {
  static init(sequelize) {
    super.init({
      // --- ADICIONE ISTO ---
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // --------------------
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      user_id: DataTypes.UUID,
      game_id: DataTypes.UUID,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Game, { foreignKey: 'game_id', as: 'game' });
  }
}

module.exports = Review;