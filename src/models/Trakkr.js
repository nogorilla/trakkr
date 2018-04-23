const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trakkrSchema = new Schema({
  description: {
    type: String,
    require: [true, 'Description is required.']
  },
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  okkurs: [{type: Schema.Types.ObjectId, ref: 'Okkur'}]
}, { timestamps: true });

const Trakkr = mongoose.model('Trakkr', trakkrSchema);

module.exports = Trakkr;
