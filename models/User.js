const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  studentNr: String,
  level: String,
  joinedClasses: [{type: Schema.Types.ObjectId, ref: 'Event'}],
  notifications: [{type: Schema.Types.ObjectId, ref: 'Notification'}],
  availability:  [{type: Schema.Types.ObjectId, ref: 'Availability'}]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;














// profilePic: String,
// userAlbums: [{type: Schema.Types.ObjectId, ref:'userAlbum'}],
// playlists: [ {type: Schema.Types.ObjectId, ref:'Playlist'} ],
// comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],