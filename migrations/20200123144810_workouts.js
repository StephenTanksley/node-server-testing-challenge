//workout table. This is the master table which will have the main workout types (push, pull, leg day)

exports.up = async function(knex) {
    await knex.schema.createTable('workout', (table) => {
        table.increments('id')
        table.string('workout_name').notNullable()
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('workout')
  };