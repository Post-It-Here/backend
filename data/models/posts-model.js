const db = require('../dbConfig');
const mappers = require('../helpers/mappers');

const addPost = (userId, post) => {
    return db('posts')
        .insert(post, 'user_id')
        .then(([id]) => get(userId, id));
}

const get = (userId, postId) => {
    let query = db('posts as p');

    if (postId) {
        query.where({ id: postId, user_id: userId}).first();

        const promises = [query, getPostSubs(postId)];

        return Promise.all(promises)
            .then((results) => {
            let [post, subs] = results;

            if (post) {
                post.subs = subs;

                return mappers.postToBody(post);
            } else {
                return null;
            }
        });
    } else {
        return query.where({ user_id: userId }).then(posts => {
            return posts.map(post => mappers.postToBody(post));
        })
    }
}

const getPostSubs = (postId) => {
    return db('subs')
        .where('post_id', postId)
}

const updatePost = (id, changes) => {
    return db('posts')
        .where('id', id)
        .update(changes)
}

const deletePost = (id) => {
    return db('posts').where({ id: id }).del();
}

module.exports = {
    get,
    addPost,
    getPostSubs,
    updatePost,
    deletePost
}
