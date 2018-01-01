const mongoose = require('mongoose');
const Okkur = require('./Okkur');
const Schema = mongoose.Schema;

const trakkrSchema = new Schema({
  description: {
    type: String,
    require: [true, 'Description is required.']
  },
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  okkurs: [Okkur.schema]
}, { timestamps: true });

const Trakkr = mongoose.model('Trakkr', trakkrSchema);

module.exports = Trakkr;
