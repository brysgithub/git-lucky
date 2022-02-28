const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Statistics extends Model {}

Statistics.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id',
          unique: true
      }
    },
    total_wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    total_losses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    longest_win_streak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    longest_lose_streak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    biggest_win: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    biggest_loss: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'statistics',
  }
);

module.exports = Statistics;