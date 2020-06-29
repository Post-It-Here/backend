const request = require('supertest');
const server = require('../api/server');

describe('server.js', () => {
    describe('registration route', () => {
        it('should return 200 status code', async () => {
            let username = `user-${Math.random() * Math.random()}`;
            console.log(typeof username);
            return await request(server)
                .post('/api/auth/register')
                .send({ username: username, password: 'password' })
                .expect(201)
        });

        it('should return a JSON object', async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send({ username: `user${Math.random() * Math.random()}`, password: 'password' })
            
            expect(response.type).toEqual('application/json');
        })
    });
});
