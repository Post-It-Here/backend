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

const createSubs = (subs) => {
    return db('subs')
        .insert(subs, 'id')
        .then(([id]) => {get(id)});
}

module.exports = {
    get,
    createSubs
}
