const router = require('express').Router();
const { User } = require('../../models');

router.post('/updateLongest', async (req, res) => {
  try {
    const userHistory = await Transaction.findAll({
        attributes: {
            include: [ 'result' ]
        },
        where: {
            user_id: req.body.user_id,
        }
    });

    let maxWin = 0;
    let maxLoss = 0;

    console.log(userHistory);
    console.log(userHistory.result);

    // userHistory.result.forEach(index => {
    //     if (index > 0) {

    //     }
    // });
    
    
    res.status(200).json(userHistory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
