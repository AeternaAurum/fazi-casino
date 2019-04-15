const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
  name: String,
  description: String,
  // needs a ref to casino, can't do it like a subdocument
  casinos: [{ type: Schema.Types.ObjectId, ref: 'casino' }],
  image: String,
});

module.exports = mongoose.model('city', citySchema);
