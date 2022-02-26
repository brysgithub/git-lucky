const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const seed_generator = (length) => {
  var seed = '';
  var library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for ( var i = 0; i < length; i++ ) {
    seed += library.charAt(Math.floor(Math.random() * library.length));
  }
  return seed;
};

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },

    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Used to generate a random avatar on user creation
    avatar_seed: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.avatar_seed = seed_generator(10);
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
