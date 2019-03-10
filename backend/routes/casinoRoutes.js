// might not need this file if no seperate casino collection
const Casino = require('../models/Casino');
const config = require('../config/database');

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

  return router;
};
