const db = require('../data/dbConfig')
const workoutModel = require('./workoutModel')

//re-run the seeds prior to every test.
beforeEach(async () => {
    await db.seed.run()
})


//these are unit tests. Each function is tested in isolation to see if it will function as expected.
describe('Workout Model functions', async () => {
    //we expect a list of all workouts.

    test('find function', () => {
        const res = await workoutModel.get()
        expect(res.length).toBeGreaterThan(0)
    })

    test('findById function', async () => {
        const res = await workoutModel.findById(1)
        expect(res.workout_name).toMatch(/push/i)
    })

    test('insert', async () => {
        await workoutModel.insert({ workout_name: "Yoga"})
        const workouts = await db('workout').select()
        expect(workouts).toHaveLength(4)
    })

    test('update', async() => {
        await workoutModel.update(1, { workout_name: "Plyometrics"})
        const workout = await workoutModel.findById(1)
        expect(workout.workout_name).toMatch(/plyometrics/i)
    })

    test('remove', async () => {
        await workoutModel.remove(1)
        const workouts = await workoutModel.list()
        expect(workouts).toHaveLength(2)
    })
})