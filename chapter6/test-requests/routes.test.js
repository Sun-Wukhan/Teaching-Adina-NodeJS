const request = require('supertest');
const app = require('./Server'); // the path to your app file.

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});