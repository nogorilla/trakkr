const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,
  date: Date,
}, { timestamps: true });

const Trackr = mongoose.model('Trackr', taskSchema);

module.exports = Trackr;
