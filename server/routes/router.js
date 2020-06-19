const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../database/models/users-model');
const Posts = require('../../database/models/posts-model');
const Subs = require('../../database/models/subs-model');

const router = express.Router();

router.post('/register', async (req, res) => {

})

module.exports = router;
