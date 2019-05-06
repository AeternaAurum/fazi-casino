const City = require('../models/City');
const Casino = require('../models/Casino');

const casinosJSON = require('./casinos.json');
const citiesJSON = require('./cities.json');

Casino.insertMany(casinosJSON, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});

City.insertMany(citiesJSON, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});
