const router = require('express').Router();
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');
const statisticsRoutes = require('./statisticsRoutes');

router.use('/users', userRoutes);

router.use('/transactions', transactionRoutes);

router.use('/statistics', statisticsRoutes);

module.exports = router;
