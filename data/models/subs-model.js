const db = require('../dbConfig');
const mappers = require('../helpers/mappers');

const get = (id) => {
    let query = db('subs');

    if (id) {
        return query
            .where('id', id)
            .first()
            .then(sub => {
                if (sub) {
                    return mappers.subToBody(sub);
                } else {
                    return null
                }
            })
    } else {
        return query.then(subs => {
            return subs.map(sub => mappers.subToBody(sub));
        })
    }
}

const addSubs = (subs) => {
    return db('subs')
        .insert(subs, 'id')
}

const updateSubs = (id, changes) => {
    return db('subs')
        .where('id', id)
        .update(changes)
        .then((count) => (count > 0 ? get(id) : null))
};

module.exports = {
    get,
    addSubs,
    updateSubs
}
