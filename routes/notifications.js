const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Notification = require("../models/Notification");
const User = require("../models/User");

router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  
  Notification.findById(id)
  .then(foundMessage => {
    res.status(200).json(foundMessage);
  })
  .catch(err => res.status(400).json(err));
})

router.post('/send-message', function(req, res, next) {
    const { message, adminId } = req.body;
    Notification.create({ notification: message, userId: adminId })
    .then(newMessage => {
      console.log(newMessage);

      return User.findByIdAndUpdate(
        adminId,
        { $push: { notifications: newMessage._id } },
        { new: true }
      ).populate("notifications");
    })
    .then(updatedUser => {
      res.status(201).json(updatedUser);
      console.log(updatedUser);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

router.post('/send-reminder', function(req, res, next) {
    const { reminder, userId } = req.body;
    Notification.create({ notification: reminder, userId: userId })
    .then(newMessage => {
      console.log(newMessage);

      return User.findByIdAndUpdate(
        userId,
        { $push: { notifications: newMessage._id } },
        { new: true }
      ).populate("notifications");
    })
    .then(updatedUser => {
      res.status(201).json(updatedUser);
      console.log(updatedUser);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

router.get('/', function(req, res, next) {
  
  Notification.find()
  .then(foundMessage => {
    res.status(200).json(foundMessage);
  })
    .catch(err => res.status(400).json(err));
  })

module.exports = router;