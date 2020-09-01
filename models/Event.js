const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  level: String,
  students: [{type: String}],
  teacher: String,
  topic: String,
  start: {type:Date},
  end: {type:Date},
  title: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;



