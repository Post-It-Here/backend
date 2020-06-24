const router = require('express').Router();
const axios = require('axios');
const Posts = require('../../data/models/posts-model');
const Subs = require('../../data/models/subs-model');

//GET A USER'S POSTS
router.get('/posts', async (req, res) => {
    try {
        const postList = await Posts.get();

        postList
            ? res.status(200).json(postList)
            : res.status(500).json({ message: 'Could not get posts.' });
    } catch (err) {
        res.status(500).json({ message: 'Whoops, something went wrong.' });
    }
});

//GET A USER'S POST BY ID
router.get('/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const post = await Posts.get(id);

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
    let { title, description } = req.body;

    if (!title || !description) {
        res.status(500).json({ message: 'You must provide a title & description.' });
    }

    try {
        let post = Posts.addPost({ title: title, description: description });
        if (post) {
            res.status(200).json(post);
            axios.post('https://post-it-here-data-api.herokuapp.com/api/predict_many')
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.error(err))
        } else {
            res.status(500).json({ message: 'There was a problem with creating a post.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Whoops, something went wrong.' });
    }
});

//UPDATE A POST
router.put('/posts', async (req, res) => {});

// DELETE A POST
router.delete('/posts/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const deleted = Posts.deletePost(id);
        if (deleted) {
            res.status(200).json(deleted);
        } else {
            res.status(500).json({ message: 'Could not delete post.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Whoops, something went wrong.' });
    }
});

module.exports = router;
