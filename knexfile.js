// Update with your config settings.
const sqlite = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
}

module.exports = {
  dev: {
    ...sqlite,
    connection: { 
      filename: './data/workouts.db3',
    },
  },
  test: {
    ...sqlite,
    connection: { 
      filename: './data/test.db3',
    },
  },
};

//need to run npx knex migrate:latest --env=dev/test.
//need to run npx knex seed:run --env=dev/test

//this is looking for an environment with the flag of 'dev' which exists in the module.exports object.