const supertest = require('supertest')

//server won't actually start due to the if statement in index.js

const server = require('./index')
const db = require('./data/dbConfig')

//re-run the seeds prior to every test.
beforeEach(async () => {
    await db.seed.run()
})

test('welcome route', async () => {
    const res = await supertest(server).get('/')

    //three questions. First - does it return the right status code?
    expect(res.status).toBe(200)
    //right data format?
    expect(res.type).toBe('application/json')
    //does it return the data we're expecting?
    expect(res.body.message).toMatch(/workout api/i)
})

test('Workout list', async () => {
    const res = await supertest(server).get('/workouts')
    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0].id).toBe(1)
    expect(res.body[0].workout_name).toMatch(/push/i)
})

//need to figure out how to test creating an item and updating an item.

test('create workout', async () => {
    const res = await supertest(server)
        .post('/workouts')
        .send({ workout_name: "Kenpo"})
    //does it return the proper status code?
    expect(res.status).toBe(201)

    //does it return the proper type?
    expect(res.type).toBe('application/json')
    
    //does it return the data we expect to see?
    expect(res.body).toEqual({
        id: 4,
        workout_name: "Kenpo"
    })
})

test('update workout', async () => {
    const res = await supertest(server)
        .put('/workouts/1')
        .send({ workout_name: "Stretching" })

    //does it return the expected status code?
    expect(res.status).toBe(200)

    //does it return the expected data format?
    expect(res.type).toBe('application/json')

    //does it return the data we expect?
    expect(res.body).toEqual({
        id: 1,
        workout_name: "Stretching"
    })
})

test('remove item from the DB', async () => {
    const res = await supertest(server).delete('/workouts/1')
    expect(res.status).toBe(204)
    expect(res.type).toBe('')
    // expect(res.body).toBe("")
})

test('remove an item from the DB', async () => {
   const res = await supertest(server).delete('/workouts/1')
   const workouts = await db('workout')

   expect(workouts.length).toBe(2)
})