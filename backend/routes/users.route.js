const express = require("express");
let User = require("../models/user.model");

const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .then((result) => {
      //   (users) => res.json(users);
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
      //   (err) => res.status(400).json("Error: " + err);
    });
});

module.exports = router;
