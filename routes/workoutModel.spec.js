const db = require('../data/dbConfig')
const workoutModel = require('./workoutModel')

//re-run the seeds prior to every test.
beforeEach(async () => {
    await db.seed.run()
})


//these are unit tests. Each function is tested in isolation to see if it will function as expected.

//describe cannot be async.
describe('Workout Model functions', () => {
    //we expect a list of all workouts.

    test('get function', async () => {
        const res = await workoutModel.get()
        expect(res.length).toBeGreaterThan(0)
    })

    test('getById function', async () => {
        const res = await workoutModel.getById(1)
        expect(res.workout_name).toMatch(/push/i)
    })

    test('add', async () => {
        await workoutModel.add({ workout_name: "Yoga"})
        const workouts = await db('workout').select()
        expect(workouts).toHaveLength(4)
    })

    test('update', async() => {
        await workoutModel.update(1, { workout_name: "Plyometrics"})
        const workout = await workoutModel.getById(1)
        expect(workout.workout_name).toMatch(/plyometrics/i)
    })

    test('remove', async () => {
        await workoutModel.remove(1)
        const workouts = await workoutModel.get()
        expect(workouts).toHaveLength(2)
    })
})