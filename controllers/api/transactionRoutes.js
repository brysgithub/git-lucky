const router = require('express').Router();
const { Transaction } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/:amount", withAuth, async (req, res) => {
    const transaction = await Transaction.create({
        user_id: req.session.user_id,
        result: req.params.amount,
    });

    res.json(transaction);
});

module.exports = router;
