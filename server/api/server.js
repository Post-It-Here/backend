const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authenticate = require('../auth/authenticate');
const authRouter = require('../routes/authRouter');
const appRouter = require('../routes/appRouter');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use('/api', authRouter);
server.use('/api', authenticate, appRouter);

server.get('/', () => {
    res.send('Server is running');
});
