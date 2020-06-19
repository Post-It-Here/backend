const db = require('../dbConfig');

const addUser = (user) => {
    return db('users').insert(user);
}

const getUserBy = (property) => {
    return db()
        .select('*')
        .from('users')
        .where({ property });
}

module.exports = { 
    addUser,
    getUserBy 
};
