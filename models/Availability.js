const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
  sunday: [{type: String}],
  monday: [{type: String}],
  tuesday: [{type: String}],
  wednesday: [{type: String}],
  thursday: [{type: String}],
  friday: [{type: String}],
  saturday: [{type: String}],
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
