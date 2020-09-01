const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new Schema({
  notification: String,
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Notification = mongoose.model('Notification', notifySchema);

module.exports = Notification;



