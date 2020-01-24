const workoutDb = require('../data/dbConfig')

// const validateWorkoutId = () => async (req, res, next) => {
//     const workout = await workoutDb.getById(req.params.id)
//         if(!workout) {
//             return res.status(400).json({ message: 'Invalid workout id.'})
//         }
//         req.(something) = id
// }

//used to validate that there's stuff in the body to be sent.
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

module.exports = {
    validateWorkout,
}