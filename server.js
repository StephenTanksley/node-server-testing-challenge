const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const workoutRouter = require('./routes/workoutRoute')

const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/workouts', workoutRouter)

server.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Workout API"
    })
})

server.use((err, req, res, next) => {
    console.log("Error: ", err)
    res.status(500).json({
        message: "Something went horribly wrong."
    })
})

module.exports = server