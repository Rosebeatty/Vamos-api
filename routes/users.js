var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const multer = require("multer");


var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single("file");

router.post("/upload/:id", (req, res, next) => {
  const { id } = req.params;

  upload(req, res, err => {
    if (err) {
      res.status(400).send("failed to save");
    } else {
      console.log("The filename is " + res.req.file.filename);

      User.create({ profilePic: res.req.file.filename })
        .then(newPic => {
          console.log(newPic);

        //   return User.findByIdAndUpdate(
        //     id,
        //     { $push: { objects: newModel._id } },
        //     { new: true }
        //   ).populate("models");
        // })
        // .then(updatedUser => {
          res.status(201).json(updatedUser);
        })
        .catch(err => {
          res.status(400).json(err);
        });
      // res.send(res.req.file.filename);
    }
  });
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(id)
    .then(foundUser => {
      res.status(200).json(foundUser);
    })
    .catch(err => res.status(400).json(err));
});

router.get('/', function(req, res, next) {
    
  User.find()
  .then(foundUser => {
    res.status(200).json(foundUser);
  })
  .catch(err => res.status(400).json(err));
  
})

        
    
module.exports = router;
