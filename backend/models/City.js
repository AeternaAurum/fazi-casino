const mongoose = require('mongoose');
const casinoSchema = require('./Casino');
const { Schema } = mongoose;

const citySchema = new Schema({
  name: String,
  description: String,
  casinos: [casinoSchema] // can't do it like this if casino is a collection
});

module.exports = mongoose.model('city', citySchema);
