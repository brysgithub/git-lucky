const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Transaction, Statistics } = require('../../models');

router.post('/update', withAuth, async (req, res) => {
  try {
    const userHistory = await Transaction.findAll({
        attributes: [ 'result' ],
        where: {
            user_id: req.body.user_id,
        }
    });

    let data = {};

    if (userHistory.length > 0) {
        let wins = 0;
        let losses = 0;
        let maxWin = 0;
        let maxLoss = 0;
        let winStreak = 0;
        let lossStreak = 0;
        let lastSign = 0;
        let currentStreak = 1;

        if (Math.sign(userHistory[0].result) > 0) {
            wins++;
            maxWin = userHistory[0].result;
            lastSign = Math.sign(userHistory[0].result);
        } else {
            losses++;
            maxLoss = userHistory[0].result;
            lastSign = Math.sign(userHistory[0].result);
        }

        for (let i = 1; i < userHistory.length; i++) {
            const current = userHistory[i].result;
            if (Math.sign(current) > 0) {
                wins++;
                if (current > maxWin) {
                    maxWin = current;
                }
                if (Math.sign(current) === lastSign) {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                    lastSign = Math.sign(current);
                }
                if (currentStreak > winStreak) {
                    winStreak = currentStreak;
                }
            } else {
                losses++;
                if (current < maxLoss) {
                    maxLoss = current;
                }
                if (Math.sign(current) === lastSign) {
                    currentStreak++;
                }  else {
                    currentStreak = 1;
                    lastSign = Math.sign(current);
                }
                if (currentStreak > lossStreak) {
                    lossStreak = currentStreak;
                }
            }
        }

        data = {
            "wins": wins,
            "losses": losses,
            "maxWin": maxWin, 
            "maxLoss": maxLoss, 
            "winStreak": winStreak, 
            "lossStreak": lossStreak
        };
        console.log(data);
        let userStatistics = await Statistics.findOne({ where: { user_id: req.body.user_id }});
        userStatistics.total_wins = data.wins;
        userStatistics.total_losses = data.losses;
        userStatistics.biggest_win = data.maxWin;
        userStatistics.biggest_loss = data.maxLoss;
        userStatistics.longest_win_streak = data.winStreak;
        userStatistics.longest_lose_streak = data.lossStreak;
        await userStatistics.save();
        
    }


    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
