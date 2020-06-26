const db = require('../dbConfig');

const addUser = (user) => {
    return db('users').insert(user);
}

const getUserByUsername = (username) => {
    return db('users')
        .select('*')
        .where({ username: username })
        .first();
}

module.exports = { 
    addUser,
    getUserByUsername
};
