const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('../routes/authRouter');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use('/api/', authRouter);

server.get('/', () => {
    res.send('Server is running');
})
