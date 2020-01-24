
exports.seed = async (knex) => {
  await knex('workout').insert([
    { id: 1, workout_name: "Push"},
    { id: 2, workout_name: "Pull"},
    { id: 3, workout_name: "Legs"},
  ])
};
