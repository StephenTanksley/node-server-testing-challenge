const workoutDb = require('../data/dbConfig')

const validateWorkout = () => async (req, res, next) => {
    if(!req.body) {
        return res
            .status(404)
            .json({ message: "Missing required data."})
    } else if (!req.body.workout_name) {
        return res.status(400).json({ message: "Missing required data - workout name"})
    }
    next()
}