const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');

const events = [
  {level : "A1", students : [], teacher: "Javi", topic: 'Traditional Food', title: 'Traditional Food', start:new Date('2020-04-28 12:00:00'), end:new Date('2020-04-28 13:00:00')},
  {level : "A1", students : [], teacher: "Livi", topic: 'Flamenco', title: 'Flamenco', start:new Date('2020-06-3 12:00:00'), end: new Date('2020-06-3 13:00:00')},
  {level : "A1", students : [], teacher: "Rose", topic: 'Sports', title: 'Sports', start:new Date('2020-06-15 12:00:00'), end: new Date('2020-06-15 13:00:00')},
  {level : "A1", students : [], teacher: "Livi", topic: 'Music', title: 'Music', start:new Date('2020-06-20 12:00:00'), end: new Date('2020-06-20 13:00:00')},
  {level : "A1", students : [], teacher: "Javi", topic: 'Nature', title: 'Nature', start:new Date('2020-06-20 12:00:00'), end: new Date('2020-06-20 13:00:00')},
  {level : "A2", students : [], teacher: "Rose", topic: 'Work', title: 'Work', start:new Date('2020-07-30 12:00:00'), end: new Date('2020-07-30 13:00:00')},
  {level : "A3", students : [], teacher: "Livi", topic: 'Books', title: 'Books', start:new Date('2020-08-30 12:00:00'), end: new Date('2020-08-30 13:00:00')},
  {level : "A3", students : [], teacher: "Javi", topic: 'Games', title: 'Games', start:new Date('2020-07-30 12:00:00'), end: new Date('2020-07-30 13:00:00')},
  {level : "A3", students : [], teacher: "Rose", topic: 'Seasons', title: 'Seasons', start:new Date('2020-06-30 12:00:00'), end: new Date('2020-06-30 13:00:00')},
  {level : "A4", students : [], teacher: "Livi", topic: 'Whatever', title: 'Whatever', start:new Date('2020-06-25 12:00:00'), end: new Date('2020-06-25 13:00:00')},
  {level : "A4", students : [], teacher: "Javi", topic: 'Random', title: 'Random', start:new Date('2020-06-30 12:00:00'), end: new Date('2020-06-30 13:00:00')},
  {level : "A4", students : [], teacher: "Rose", topic: 'Flamenco', title: 'Flamenco', start:new Date('2020-06-15 12:00:00'), end: new Date('2020-06-15 13:00:00')},
]
const users = [
  {username: 'none', email: 'none@gmail.com', password:'none', level:'A2'},
]


mongoose
  .connect("mongodb://localhost:27017/vamos", { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    return Event.create(events);
  })
  .then(() => {
    return User.create(users);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(err => console.log(err));