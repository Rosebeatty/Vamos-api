const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");


router.put('/join/:id', function(req, res, next) {
  const { id } = req.params;
  const { userId, username } = req.body;
  console.log(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findByIdAndUpdate(
      id,  
      {$push: { students: req.body.username } },
      {new: true}
    )
    .then(newEvent => {
      console.log(newEvent);
      return User.findByIdAndUpdate(userId, { $push: {joinedClasses: newEvent._id} }, {new: true}).populate('joinedClasses')
    })
    
    .then(updatedUser => {
              res.status(201).json(updatedUser);
              console.log(updatedUser);
          })
          .catch(err => {
                res.status(400).json(err);
          }) 
})
        

      
      /* GET users listing. */

router.get('/:id', function(req, res, next) {
    const { id } = req.params;
      
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
      
    Event.findById(id)
      .then(foundEvent => {
        res.status(200).json(foundEvent);
      })
      .catch(err => res.status(400).json(err));
    });


  router.get('/', function(req, res, next) {
    Event.find()
      .then(foundEvents => {
        res.status(200).json(foundEvents);
        })
      .catch(err => res.status(400).json(err));
    });


module.exports = router;
