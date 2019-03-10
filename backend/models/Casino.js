const mongoose = require('mongoose');
const { Schema } = mongoose;

const casinoSchema = new Schema({
  name: String,
  category: String, // from ../utils/category
  description: String
});

// no mongoose#model if not making a connection
module.exports = casinoSchema;
