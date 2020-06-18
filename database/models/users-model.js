const db = require('../dbConfig');

const getUserBy = (property) => {
    return db()
        .select('*')
        .from('users')
        .where({ property });
}

module.exports = { getUserBy };