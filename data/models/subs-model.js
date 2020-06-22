const db = require('../dbConfig');

const getSubs = () => {
    return db().select('*').from('subs');
}

const getSubsById = (id) => {
    return db().select('*').from('subs').where({ id });
}

const createSubList = (subList) => {
    return db('subs').insert(subList)
}

module.exports = {
    getSubs,
    getSubsById,
    createSubList
}
