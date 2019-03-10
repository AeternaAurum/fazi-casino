const City = require('../models/City');
const Casino = require('../models/Casino');
const config = require('../config/database');

module.exports = router => {
  router.get('/cities', (req, res) => {
    City.find({}, (err, cities) => {
      if (err) {
        res.json({
          success: false,
          message: err
        });
      } else {
        if (!cities) {
          res.json({
            success: false,
            message: 'No cities found'
          });
        } else {
          res.json({
            success: true,
            cities
          });
        }
      }
    });
  });

  // HACK to add test city
  //
  // const city = new City({
  //   name: 'Nis',
  //   description: 'blah blah blah'
  // });

  // city.save(err => {
  //   err ? console.log(err) : console.log('success');
  // });

  return router;
};
