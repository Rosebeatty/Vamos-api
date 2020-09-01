const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelSchema = new Schema({
  level: String,
  students: [{type: Schema.Types.ObjectId, ref: 'User'}],
  events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

const Level = mongoose.model('Level', levelSchema);

module.exports = Level;



