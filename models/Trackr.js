const mongoose = require('mongoose');
const moment = require('moment');

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

trackrSchema.methods.formatted_date = function formatted_date(format) {
  if (!format) {
    format = "dddd, MMMM Do YYYY";
  }
  return moment.utc(this.date).format(format);
}

const Trackr = mongoose.model('Trackr', trackrSchema);

module.exports = Trackr;
