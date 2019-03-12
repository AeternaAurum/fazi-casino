const mongoose = require('mongoose');
const { Schema } = mongoose;

const casinoSchema = new Schema({
  name: String,
  category: String, // from ../utils/category
  description: String,
  // Would it work like this?
  devices: [
    { x: Number, y: Number, apparatusType: String, orientation: Number }
  ]
});

// no mongoose#model if not making a connection
module.exports = mongoose.model('casino', casinoSchema);
