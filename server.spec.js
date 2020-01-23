const request = require('supertest') //calling it 'request' is common practice.

const server = require('./server.js') //this is the first red, file doesn't exist yet.

describe('server.js', () => {
    //http calls made with supertest return promises, we can use async/await if desired.
    describe('index route', () => {
    //do a get request to the api(server.js) and inspect the response.
        
        //checking to make sure the correct status code is returned.
        it('should return an OK status code from the index route', async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get('/');
            expect(response.status).toEqual(expectedStatusCode)
        })

        // //checking to make sure that the correct data is returned and has the right content.
        // it('should return a JSON object from the index route', async () => {
        //     const expectedBody = { api: "running" };
        //     const response = await request(server).get('/');
        //     expect(response.body).toEqual(expectedBody);
        // })

        // //checking to make sure that we're returning data in the right format.
        // it('should return a JSON object from the index route', async () => {
        //     const response = await request(server).get('/');
        //     expect(response.type).toEqual('application/json')
        // })
    })

    describe('/sing route', () => {
        it('should return an OK status code from the /sing route', async () => {
            const expectedBody = { message: "I believe I can fly, I believe I can test RESTFUL APIs"}
            const response = await request(server).get('/sing')
            expect(response.body).toEqual(expectedBody)
        })
    })
})