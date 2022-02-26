const sequelize = require('../config/connection');
const { User, Transaction } = require('../models');

const userData = require('./userData.json');
const transactionData = require('./transactionData.json');

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

  /**
   * Leaving for future reference
   */

  const transactions = await Transaction.bulkCreate(transactionData);

  process.exit(0);
};

seedDatabase();
