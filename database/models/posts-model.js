const db = require('../dbConfig');

const getPosts = () => {
    return db().select('*').from('posts');
}

const getPostsByUserId = (id) => {}

module.exports = {
    getPosts,
    getPostsByUserId
}
