const router = require('express').Router();
const axios = require('axios');
const Posts = require('../../data/models/posts-model');
const Subs = require('../../data/models/subs-model');

//GET A USER'S POSTS
router.get('/posts', async (req, res) => {});

//GET A USER'S POST BY ID
router.get('/posts/:id', async (req, res) => {});

//CREATE A POST
router.post('/posts', async (req, res) => {
    let { title, description } = req.body;

    if (!title || !description) {
        res.status(500).json({ message: 'You must provide a title & description.' });
    }

    try {
        const post = Posts.addPost({ title: title, description: description });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(500).json({ message: 'There was a problem with creating a post.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Whoops, something went wrong.' });
    }
});

// DELETE A POST
router.delete('/posts/:id', async (req, res) => {});

module.exports = router;
