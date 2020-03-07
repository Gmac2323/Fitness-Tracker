const router = require("express").Router();
const Workout = require('../models/workout.js');
/* add a new workout */
router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

/* add workouts */
router.put('/api/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(
    // the id of the item to find
     req.params.id
    ,
    {
      $push: {
        exercises: req.body    
      }
    },
    { new: true },
    (err, exercise) => {
      if (err) {
        throw err;
      }
      return res.send(exercise);
    }
  )
})

/* all workouts */
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    // .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

/* last 7 workout */
router.get("/api/workouts/range", (req, res) => {
  Workout.find().sort({"_id":-1}).limit(7)
    .then(dbTransaction => {
      res.json(dbTransaction);
      console.log(req.body);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

module.exports = router;