const express = require("express");
let Exercise = require("../models/exercise.model");

const router = express.Router();

router.get("/", (req, res) => {
  Exercise.find()
    .then((result) => {
      //   (exercises) => res.json(exercises);
      res.send(result);
    })
    .catch((err) => {
      console.log(err.message);
      //   console.log((err) => res.status(400).json("Error " + err));
    });
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({ username, description, duration, date });
  newExercise
    .save()
    .then(() => {
      res.json("Exercise added");
    })
    .catch((err) => {
      console.log(err.message);
      //   (err) => res.status(400).json("Error: " + err);
    });
});

router.get("/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", (req, res) => {
  Exercise.findByIdAndUpdate(req.params.id)
    .then((exercise) => {
      (exercise.username = req.body.username),
        (exercise.description = req.body.description),
        (exercise.duration = Number(req.body.duration)),
        (exercise.data = Date.parse(req.body.date));

      exercise
        .save()
        .then(() => {
          res.send("Exercise Updated");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
