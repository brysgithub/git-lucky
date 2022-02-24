const User = require('./User');
// const Transaction = require('./Transaction');
// const Game = require('./Game');

// User.hasMany(Transaction, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });

// Transaction.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// Game.hasMany(Transaction, {
//     foreignKey: 'game_id',
//     onDelete: 'CASCADE'
// });

// Transaction.belongsTo(Game, {
//     foreignKey: 'game_id',
//     onDelete: 'CASCADE'
// });

module.exports = { User };