const sequelize = require('../config/connection');
const { User, Transaction, Statistics } = require('../models');

const userData = require('./userData.json');
//const transactionData = require('./transactionData.json');
const statisticsData = require('./statisticsData.json');

/**
 * Leaving for future reference
 */

// const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const statistics = await Statistics.bulkCreate(statisticsData);

  /**
   * Leaving for future reference
   */

  //const transactions = await Transaction.bulkCreate(transactionData);

  process.exit(0);
};

seedDatabase();
