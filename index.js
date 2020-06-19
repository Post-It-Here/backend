require('dotenv').config();
const server = require('express')();
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    `Server listening on: http://localhost:${PORT}`;
});
