const db = require('../data/dbConfig')

// functions I need to add:

const get = () => {
    return db('workout').select("*")
}

const getById = (id) => {
    return db('workout')
        .where({ id })
        .select("*")
        .first()
}

const add = async (workout) => {
    const [id] = await db('workout').insert(workout)
    return getById(id)
}

const update = async (id, changes) => {
    await db('workout')
        .where({ id })
        .update(changes)

        return getById(id)
}

const remove = (id) => {
    return db('workout')
        .where({ id })
        .del()
}

module.exports = {
    get,
    getById,
    add,
    update,
    remove
}