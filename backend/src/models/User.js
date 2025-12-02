const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      // --- ADICIONE ISTO ---
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // --------------------
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      password_hash: DataTypes.STRING,
      biography: DataTypes.TEXT,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }

  static associate(models) {
    // Relação: Quem eu sigo (Meus ídolos)
    this.belongsToMany(models.User, {
      foreignKey: 'follower_id', // Eu sou o seguidor
      as: 'following',           // Vou chamar essa lista de "following"
      through: 'user_follows',   // Nome da tabela pivô
    });

    // Relação: Quem me segue (Meus fãs)
    this.belongsToMany(models.User, {
      foreignKey: 'following_id', // Eu sou o seguido
      as: 'followers',            // Vou chamar essa lista de "followers"
      through: 'user_follows',
    });

  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;