require('dotenv').config();
const server = require('./server/api/server');
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
