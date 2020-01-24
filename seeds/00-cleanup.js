exports.seed = async (knex) => {
  // await knex('accessories').truncate()
  // await knex('main_lifts').truncate()
  await knex('workout').truncate()
};