const mongoose = require('mongoose');
const moment = require('moment');
const Okkur = require('./Okkur');
const Schema = mongoose.Schema;

const trakkrSchema = new Schema({
  description: {
    type: String,
    require: [true, 'Description is required.']
  },
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  children: [Okkur.schema]
}, { timestamps: true });

const Trakkr = mongoose.model('Trakkr', trakkrSchema);

module.exports = Trakkr;
