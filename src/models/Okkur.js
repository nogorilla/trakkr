const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const okkursSchema = new Schema({
  description: {
    type: String,
    require: [true, 'Description is required.']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  trakkr: {type: Schema.Types.ObjectId, ref: 'Trakkr'},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

okkursSchema.methods.formatted_date = (format) => {
  if (!format) {
    format = 'dddd, MMMM Do YYYY';
  }
  return moment.utc(this.date).format(format);
};

okkursSchema.pre('save', (next) => {
  if ('invalid' === this.description) {
    return next(new Error('#sadpanda'));
  }
  next();
});

const Okkur = mongoose.model('Okkur', okkursSchema);

module.exports = Okkur;
