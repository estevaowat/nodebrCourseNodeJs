const assert = require('assert')
const api = require('./../api')

let app = {}

describe('Api Methods Tests', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('list heroes on /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=0'
        });

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(data))
    })

    it('list heroes on /heroes - should return statusCode 500', async () => {
        const LIMIT_HEROES = 'TEST';
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${LIMIT_HEROES}`
        });

        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 500)

    })
    it('list heroes on /heroes - should return a specific hero', async () => {
        const NAME_HERO = 'Naruto bushin -1560218755264';

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?name=${NAME_HERO}&skip=0&limit=10`
        });

        const data = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.deepEqual(data[0].name, NAME_HERO);

    })

})