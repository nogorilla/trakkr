const mongoose = require('mongoose');
const moment = require('moment');

const okkursSchema = new mongoose.Schema({
  description: {
    type: String,
    require: [true, 'Description is required.']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  createdBy: {
    type: String,
    required: true
  },
}, { timestamps: true });

okkursSchema.methods.formatted_date = function formatted_date(format) {
  if (!format) {
    format = "dddd, MMMM Do YYYY";
  }
  return moment.utc(this.date).format(format);
}

const Okkurs = mongoose.model('Okkurs', okkursSchema);

module.exports = Okkurs;
