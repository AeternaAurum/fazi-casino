// This is gonna end up being unused
const mongoose = require('mongoose');
const { Schema } = mongoose;

// This isn't meant to be a collection. Maybe a class would do instead?
const deviceSchema = new Schema({
  x: Number,
  y: Number,
  type: String,
  orientation: Number
});

// class Device {
//   constructor(x, y, type, orientation) {
//     this.x = x;
//     this.y = y;
//     this.type = type;
//     this.orientation = orientation;
//   }
// }

module.exports = deviceSchema;
