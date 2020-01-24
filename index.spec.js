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

test('create workout', async () => {
    const res = await supertest(server)
        .post('/workouts')
        .send({ workout_name: "Kenpo"})

    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body.workout_name).toMatch(/kenpo/i)
})

test('update workout', async () => {
    const res = await supertest(server)
        .put('/workouts/1')
        .send({ id: 1, workout_name: "Stretching" })
    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body[0]).toBe(1)
    expect(res.body[0].workout_name).toMatch(/stretching/i)
})

test('remove item from the DB', async () => {
    const res = await supertest(server).delete('/workouts/1')
    expect(res.status).toBe(204)
    // expect(res.body).toBe() -- need some help understanding this.
    // expect(res.type).toBe('application/json')
})