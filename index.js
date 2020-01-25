const express = require('express')
const workoutModel = require('./routes/workoutModel')
const server = require('./server')

const port = process.env.PORT || 5000

server.get('/', (req, res) => {
    res.status(200).json({
        message: "Workout API"
    })
})

if(!module.parent) {
    server.listen(port, () => {
        console.log(`\n=> Server up at http://localhost:${port}\n`)
    })
}

module.exports = server