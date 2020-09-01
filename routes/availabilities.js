

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Availability = require("../models/Availability");


router.put('/update/:id', function(req, res, next) {
    const {id} = req.params
    const { userId, mondayOption, tuesdayOption, wednesdayOption, thursdayOption, fridayOption, saturdayOption } = req.body;
    console.log(id)
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Availability.findByIdAndUpdate(
        id,  
        {$push: { monday: mondayOption, tuesday: tuesdayOption, wednesday: wednesdayOption, thursday: thursdayOption, friday: fridayOption, saturday:saturdayOption } },
        {new: true}
      )
      .then(newAv => {
        console.log(newAv);
        return User.findByIdAndUpdate(userId, { $push: {availability: newAv._id} }, {new: true}).populate('availabilities')
      })
      
      .then(updatedUser => {
                res.status(201).json(updatedUser);
                console.log(updatedUser);
            })
            .catch(err => {
                  res.status(400).json(err);
            }) 
  })

  router.post("/create", (req, res, next) => {
    const { userId, 
        sundayOption, 
        mondayOption, 
        tuesdayOption, 
        wednesdayOption, 
        thursdayOption, 
        fridayOption, 
        saturdayOption } = req.body;
  
    Availability.create({ sunday: sundayOption, monday: mondayOption, tuesday: tuesdayOption, wednesday: wednesdayOption, thursday: thursdayOption, friday: fridayOption, saturday:saturdayOption, userId: userId })
      .then(newAv => {
        console.log(newAv);
  
        return User.findByIdAndUpdate(
          userId,
          { $push: { availability: newAv._id } },
          { new: true }
        ).populate("availabilities");
      })
      .then(updatedUser => {
        res.status(201).json(updatedUser);
        console.log(updatedUser);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  router.get('/:id', function(req, res, next) {
    const { id } = req.params;
      
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
    
    Availability.findById(id)
      .then(foundAvail => {
        res.status(200).json(foundAvail);
        })
      .catch(err => res.status(400).json(err));
    });

  module.exports = router;
