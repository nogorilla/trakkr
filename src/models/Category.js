const mongoose = require('mongoose');
const moment = require('moment');

const trakkrSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is required.']
  },
  color: {
    type: String,
    require: [true, 'Color is required']
  }
}, { timestamps: true });

/**
 * Used to format the display date when a trakkr was set
 */
trakkrSchema.methods.formatted_date = function formatted_date(format) {
  if (!format) {
    format = 'dddd, MMMM Do YYYY';
  }
  return moment.utc(this.date).format(format);
};

const Trakkr = mongoose.model('Trakkr', trakkrSchema);
module.exports = Trakkr;
