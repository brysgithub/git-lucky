const router = require('express').Router();
const { Transaction, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
    const transaction = await Transaction.create({
        ...req.body,
        user_id: req.session.user_id
    });

    const user = await User.findByPk(req.session.user_id);
    user.balance += parseInt(req.body.result);
    await user.save();

    res.json(transaction);
});

module.exports = router;
