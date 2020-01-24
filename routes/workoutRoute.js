const express = require('express')
const workoutModel = require('./workoutModel')

const {validateWorkout} = require('../middleware/validation.js')

const router = express()

router.get('/', async (req, res, next) => {
    try {
        const workouts = await workoutModel.get()
        res.status(200).json(workouts)
    }
    catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const payload = await workoutModel.getById(req.params.id)
        res
            .status(200)
            .json(payload)
    }
    catch (error) {
        next(error)
    }
})

router.post('/', validateWorkout(), async (req, res, next) => {

})

router.put('/:id', validateWorkout(), async (req, res, next) => {

})

router.delete('/:id', async (req, res, next) => {
    try { 
        const deletedWorkout = await workoutModel.remove(req.params.id)
        if(deletedWorkout > 0) { 
            res.status(204).json({ message: "Workout was deleted."})
        }
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;