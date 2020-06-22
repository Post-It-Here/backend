const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../data/models/users-model');
const secret = require('../auth/secret');

const generateToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
  
    return jwt.sign(payload, secret.jwtSecret, options)
}

router.post('/register', async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        res.status(500).json({ message: 'You must provide a username and password.' });
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        const newUser = await Users.addUser({ username, password });
        if (newUser) {
            res.status(201).json(newUser);
        } else {
            res.status(500).json({ message: 'There was a problem with creating an account.' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Whoops, something went wrong.' });
    }
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        res.status(500).json({ message: 'You must provide a username and password.' });
    }

    try {
        const user = await Users.getUserByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);

            res.status(200).json({ message: `Welcome, ${user.username}`, token: token })
        } else {
            res.status(500).json({ message: 'Your username or password is incorrect.' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Whoops, something went wrong.' });
    }
})

module.exports = router;
