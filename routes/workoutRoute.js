const express = require('express')
const workoutModel = require('./workoutModel')

const {validateWorkout, validateWorkoutId} = require('../middleware/validation.js')

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

router.get('/:id', validateWorkoutId(), async (req, res, next) => {
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
    try {
        const workout = await workoutModel.insert(req.body)
        res.status(201).json(workout)
    }
    catch (error) {
        next(error)
    }
})

router.put('/:id', validateWorkout(), validateWorkoutId(), async (req, res, next) => {
    const changes = req.body
    const { id } = req.params

    try {
        const updates = await workoutModel.update(id, changes)
        res.status(200).json(updates)
    }
    catch (error) {
        next(error)
    }
})

router.delete('/:id', validateWorkoutId(), async (req, res, next) => {
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