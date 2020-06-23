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

const deletePost = (post) => {
    return db('posts').del(post);
}

module.exports = {
    addPost,
    getPosts,
    getPostsById,
    deletePost
}
