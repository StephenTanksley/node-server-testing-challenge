const knex = require('knex')
const config = require('../knexfile')

//if the environment variable is not set, default to 'development'. This variable is only set when running the 'test' npm script.

const dbEnv = process.env.NODE_ENV

module.exports = knex(config[dbEnv])