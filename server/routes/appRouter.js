const router = require('express').Router();
const axios = require('axios');
const Posts = require('../../data/models/posts-model');
const Subs = require('../../data/models/subs-model');

//GET A USER'S POSTS
router.get('/posts', async (req, res) => {
    const userId = req.params.userId || req.query.userId;

    try {
        const postList = await Posts.get(userId, undefined);

        postList
            ? res.status(200).json(postList)
            : res.status(500).json({ message: 'Could not get posts.' });
    } catch (err) {
        res.status(500).json({ message: 'Whoops, something went wrong.' });
    }
});

//GET A USER'S POST BY ID
router.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const userId = req.params.userId || req.query.userId;

    try {
        const post = await Posts.get(userId, postId);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(500).json({ message: 'Could not get post.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Whoops, something went wrong.' });
    }
});

//CREATE A POST
router.post('/posts', async (req, res) => {
    console.log(req.params);
    let { title, description } = req.body;
    let userId = req.params.userId || req.query.userId;

    if (!title || !description) {
        res.status(500).json({ message: 'You must provide a title & description.' });
    }

    try {
        let post = await Posts.addPost(userId, { 
            user_id: userId, 
            title: title, 
            description: description 
        });
        if (post) {
            // res.status(200).json(post)
            axios.post('https://post-it-here-data-api.herokuapp.com/api/predict_many', {
                headers: { 'Content-Type': 'application/json' },
                title: title,
                description: description,
            })
                .then(async res => {
                    let subs = res.data.subreddits;
                    let stringified = JSON.stringify(subs);
                    const post_id = post.id;
                    const subList = await Subs.addSubs({ 
                        post_id: post_id, 
                        subreddits: stringified 
                    });
                    
                    subList
                        ? console.log('success')
                        : console.log('failed')
                })
                .catch(err => console.error(err))
            res.status(200).json(post)
        } else {
            res.status(500).json({ message: 'There was a problem with creating a post.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//UPDATE A POST
router.put('/posts/:id', async (req, res) => {
    let changes = req.body;
    const id = req.params.id;

    if (!changes.title && !changes.description) {
        res.status(500).json({ message: 'You must update the title or description.' });
    }

    try {
        const updated = await Posts.updatePost(id, changes);
        if (updated) {
            res.status(200).json(updated);
            axios.post('https://post-it-here-data-api.herokuapp.com/api/predict_many', {
                title: changes.title,
                description: changes.description,
            })
                .then(async res => {
                    console.log(res.data);
                    let subs = res.data.subreddits;
                    let stringified = JSON.stringify(subs);
                    const post_id = id;
                    const subList = await Subs.updateSubs(post_id, { 
                        subreddits: stringified 
                    })
                    
                    subList
                        ? console.log('success')
                        : console.log('failed')
                })
                .catch(err => console.error(err))
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE A POST
router.delete('/posts/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const deleted = await Posts.deletePost(id);
        if (deleted) {
            res.status(200).json(deleted);
        } else {
            res.status(500).json({ message: 'Could not delete post.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

module.exports = router;
