const City = require('../models/City');
const Casino = require('../models/Casino');
const config = require('../config/database');
const fs = require('fs');

// In order to get the appropriate casinos, we need to query
// the Casinos that match the ids in the cities casinos field

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
          // Probably Casino.findById(cities.casinos.forEach?)
          res.json({
            success: true,
            cities
          });
        }
      }
    });
  });

  // HACK to add test city and base64 images

  // const imageAsBase64 = fs.readFileSync(
  //   __dirname + '/../assets/berlin.jpg',
  //   'base64'
  // );

  // const city = new City({
  //   name: 'Knj',
  //   description: 'My home city',
  //   image: imageAsBase64
  // });

  // city.save(err => {
  //   err ? console.log(err) : console.log('success');
  // });

  return router;
};
