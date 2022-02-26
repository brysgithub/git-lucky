const router = require('express').Router();
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');

router.use('/users', userRoutes);

router.use('/transactions', transactionRoutes);

module.exports = router;
