// might not need this file if no seperate casino collection
const Casino = require('../models/Casino');
const config = require('../config/database');
const Category = require('../utils/category');
const Apparatus = require('../utils/apparatus');

module.exports = router => {
  router.get('/casinos', (req, res) => {
    Casino.find({}, (err, casinos) => {
      if (err) {
        res.json({
          success: false,
          message: err
        });
      } else {
        if (!casinos) {
          res.json({
            success: false,
            message: 'No casinos found'
          });
        } else {
          res.json({
            success: true,
            casinos
          });
        }
      }
    });
  });

  // HACK for testing

  // const devices = [
  //   {
  //     x: 134,
  //     y: 155,
  //     orientation: 0,
  //     apparatusType: Apparatus.BLACKJACK_TABLE
  //   },
  //   {
  //     x: 450,
  //     y: 500,
  //     orientation: 90,
  //     apparatusType: Apparatus.SLOT_MACHINE
  //   }
  // ];

  // const casino = new Casino({
  //   name: 'MGM Grand Hotel and Casino',
  //   category: Category.ELITE_ROLLER,
  //   description: 'The best Casino in the world',
  //   devices
  // });

  // casino.save(err => {
  //   err ? console.log(`Error ${err}`) : console.log('success');
  // });

  return router;
};
