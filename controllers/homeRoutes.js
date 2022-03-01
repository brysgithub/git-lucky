const router = require('express').Router();
const { User, Statistics } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('homepage', {
      logged_in: req.session.logged_in 
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/homepage', withAuth, async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('homepage', {
      logged_in: req.session.logged_in 
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/leaderboard', withAuth, async (req, res) => {
  try {
    const biggestWinData = await Statistics.findAll({
      attributes: ['user_id', 'biggest_win'],
      order: [['biggest_win', 'DESC']]
    });

    const biggestLossData = await Statistics.findAll({
      attributes: ['user_id', 'biggest_loss'],
      order: [['biggest_loss', 'ASC']]
    });

    const longestWinData = await Statistics.findAll({
      attributes: ['user_id', 'longest_win_streak'],
      order: [['longest_win_streak', 'DESC']]
    });

    const longestLoseData = await Statistics.findAll({
      attributes: ['user_id', 'longest_lose_streak'],
      order: [['longest_lose_streak', 'DESC']]
    });

    const biggestWin = biggestWinData.map((funny) =>
      funny.get({ plain: true })
    );

    const biggestLoss = biggestLossData.map((funny) =>
      funny.get({ plain: true })
    );

    const longestWin = longestWinData.map((funny) =>
      funny.get({ plain: true })
    );

    const longestLose = longestLoseData.map((funny) =>
      funny.get({ plain: true })
    );

    const leaderboards = [biggestWin, biggestLoss, longestWin, longestLose];
    console.log(leaderboards);
    res.render('leaderboard', {
      biggestWin,
      biggestLoss,
      longestWin,
      longestLose,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('signup');
});

module.exports = router;
