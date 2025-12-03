const { Model, DataTypes } = require('sequelize');

class Game extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // --------------------
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      publisher: DataTypes.STRING,
      release_date: DataTypes.DATEONLY,
      cover_url: DataTypes.STRING,
    }, {
      sequelize,
    });
  }
}

module.exports = Game;