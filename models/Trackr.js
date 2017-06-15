const mongoose = require('mongoose');

const trackrSchema = new mongoose.Schema({
  description: String,
  date: Date,
}, { timestamps: true });

const Trackr = mongoose.model('Trackr', trackrSchema);

module.exports = Trackr;
