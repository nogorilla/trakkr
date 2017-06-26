const mongoose = require('mongoose');

const trackrSchema = new mongoose.Schema({
  description: {
    type: String,
    require: [true, 'Description is required.']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  created_by: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Trackr = mongoose.model('Trackr', trackrSchema);

module.exports = Trackr;
