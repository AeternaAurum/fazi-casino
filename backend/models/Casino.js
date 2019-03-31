const mongoose = require('mongoose');
const { Schema } = mongoose;

const casinoSchema = new Schema({
  name: String,
  category: String,
  description: String,
  devices: [
    { x: Number, y: Number, apparatusType: String, orientation: Number }
  ]
});

module.exports = mongoose.model('casino', casinoSchema);
