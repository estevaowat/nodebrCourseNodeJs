const assert = require('assert');
const api = require('./../api');
let app = {}

const USER = {
    username: 'estevaowat',
    password: '123'
}

describe('Authorization tests Suite', function () {
    this.beforeAll(async () => {
        app = await api;

    });

    it('Get Authorization TOKEN', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload);
    
        assert.deepEqual(statusCode, 200)
        assert.ok(data.token.length >= 10)


    })

})