const City = require('../models/City');
const Casino = require('../models/Casino');
// const fs = require('fs');

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
          // Maybe this isn't how you are supposed to query for
          // a referenced document? Maybe .then() on the
          // referenced document
          const casinos = [];
          cities.forEach(city => {
            city.casinos.forEach(id => {
              Casino.findById(id, (err, casino) => {
                if (err) {
                  res.json({
                    success: false,
                    message: err
                  });
                } else {
                  console.log(casino);
                  casinos.push(casino);
                  console.log(casinos);
                }
              });
            });
          });
          // Very hacky solution, find a better way
          setTimeout(() => {
            console.log(casinos);
            res.json({
              success: true,
              cities,
              casinos
            });
          }, 100);
        }
      }
    });
  });

  router.get('/city/:id', (req, res) => {
    if (!req.params.id) {
      res.json({
        success: false,
        message: 'No ID was provided'
      });
    } else {
      City.findById(req.params.id, (err, city) => {
        if (err) {
          res.json({
            success: false,
            message: 'Not a valid city'
          });
        } else {
          if (!city) {
            res.json({
              success: false,
              message: 'City not found'
            });
          } else {
            res.json({
              success: true,
              city
            });
          }
        }
      });
    }
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
