const assert = require('assert');
const api = require('./../api');
const Context = require('./../db/strategies/base/contextStrategy');
const Postgres = require('./../db/strategies/postgres/postgres');
const userSchema = require('./../db/strategies/postgres/schemas/userSchema');

let app = {}

const USER = {
    username: 'estevaowat',
    password: '123'
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$Azx7LH2IabXjrIVM/Ynl1.QQIZ9TcbkK6Qg2Dj2rxvOW1ipS9YU0S'
}

describe('Authorization tests Suite', function () {
    this.beforeAll(async () => {
        app = await api;

        const connectionPostgres = await Postgres.connect();
        const model = await Postgres.defineModel(connectionPostgres, userSchema);
        const postgres = new Context(new Postgres(connectionPostgres, model))
        await postgres.update(null, USER_DB, true)

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
    it('Should return Unauthorized when try to get a TOKEN with a wrong login', async()=>{
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username:'estevaowat',
                password: '1234124'
            }
        });

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 401)
        assert.deepEqual(data.error, 'Unauthorized')


    })

})