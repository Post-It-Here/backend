const db = require('../dbConfig');

const addPost = (post) => {
    return db('posts').insert(post);
}

const getPosts = () => {
    return db().select('*').from('posts');
}

const getPostsById = (id) => {
    return db().select('*').from('posts').where({ id });
}

module.exports = {
    addPost,
    getPosts,
    getPostsById
}
