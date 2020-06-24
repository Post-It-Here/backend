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

const getUsersPosts = (userId) => {
    return db('posts')
        .where('user_id', userId)
}

module.exports = { 
    addUser,
    getUserByUsername,
    getUsersPosts
};
