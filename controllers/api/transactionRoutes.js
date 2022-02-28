const router = require('express').Router();
const { Transaction, User, Statistics } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async (req, res) => {
    const transaction = await Transaction.create({
        ...req.body,
        user_id: req.session.user_id
    });

    const result = parseInt(req.body.result);

    const user = await User.findByPk(req.session.user_id);
    user.balance += result;
    await user.save();

    const statistics = await Statistics.findByPk(req.session.user_id);
    if (result > 0) {
        statistics.total_wins++;
        if (result > statistics.biggest_win) {
            statistics.biggest_win = result;
        }
    } else {
        statistics.total_losses++;
        if (result < statistics.biggest_loss) {
            statistics.biggest_loss = result;
        }
    }

    await statistics.save();

    res.json(transaction);
});

module.exports = router;
