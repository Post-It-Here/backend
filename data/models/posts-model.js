const db = require('../dbConfig');
const mappers = require('../helpers/mappers');

const addPost = (post) => {
    return db('posts').insert(post);
}

const get = (id) => {
    let query = db('posts as p');

    if (id) {
        query.where('p.id', id).first();

        const promises = [query, getPostSubs(id)];
        // [ posts, subs ]

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
        return query.then(posts => {
            return posts.map(post => mappers.postToBody(post));
        })
    }
}

const getPostSubs = (postId) => {
    return db('subs')
        .where('post_id', postId)
}

const deletePost = (id) => {
    return db('posts').where({ id: id }).del();
}

//NEED AN UPDATE QUERY

module.exports = {
    get,
    addPost,
    getPostSubs,
    deletePost
}
