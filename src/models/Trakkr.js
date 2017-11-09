const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const trakkrSchema = new mongoose.Schema({
  description: {
    type: String,
    require: [true, 'Description is required.']
  },
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

trakkrSchema.methods.formatted_date = function formatted_date(format) {
  if (!format) {
    format = 'dddd, MMMM Do YYYY';
  }
  console.log(this);
  return moment.utc(this.date).format(format);
};

const Trakkr = mongoose.model('Trakkr', trakkrSchema);

module.exports = Trakkr;
