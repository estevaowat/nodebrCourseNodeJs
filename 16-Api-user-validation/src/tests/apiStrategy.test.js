const assert = require('assert')
const api = require('./../api')

const MOCK_CREATE_HERO = {
    name: 'Genos',
    power: 'Cyborgue'
}

const MOCK_DEFAULT_HERO = {
    name: 'All Might',
    power: 'One for all'
}
let app = {}

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVzdGV2YW93YXQiLCJpZCI6MSwiaWF0IjoxNTYwNzM3NTAzfQ.uVURL6hia7nScKV4i3wu-IP_tOecxysMtavA66wHV4A'
const headers = {
    authorization: TOKEN
}

let MOCK_DEFAULT_ID = {}
describe('Api Methods Tests \n', function () {
    this.beforeAll(async () => {
        app = await api

        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            headers,
            payload: JSON.stringify(MOCK_DEFAULT_HERO)
        })

        const {
            _id
        } = JSON.parse(result.payload)

        MOCK_DEFAULT_ID = _id
    })

    it('list heroes on /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=0',
            headers
        });

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(data))
    })

    it('list heroes on /heroes - should return statusCode 400', async () => {
        const LIMIT_HEROES = 'TEST';
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${LIMIT_HEROES}`,
            headers
        });

        const ERROR_LIMIT = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "child \"limit\" fails because [\"limit\" must be a number]",
            "validation": {
                "source": "query",
                "keys": ["limit"]
            }
        }
        const payload = result.payload;
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 400)
        assert.deepEqual(payload, JSON.stringify(ERROR_LIMIT))

    })

    it('list heroes method GET on /heroes - should return a specific hero', async () => {
        const NAME_HERO = MOCK_DEFAULT_HERO.name;

        const result = await app.inject({
            method: 'GET',
            url: `/heroes?name=${NAME_HERO}&skip=0&limit=10`,
            headers
        });

        const data = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.deepEqual(data[0].name, NAME_HERO);
    });

    it('create hero method POST on /heroes', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            headers,
            payload: JSON.stringify(MOCK_CREATE_HERO)
        })

        const statusCode = result.statusCode;
        const {
            message,
            _id
        } = JSON.parse(result.payload);

        assert.ok(statusCode === 200)
        assert.deepStrictEqual(message, 'Hero created');
        assert.notStrictEqual(_id, null)
    })

    it('update a hero method PATCH on /heroes/:id', async () => {
        const HERO_UPDATE = {
            name: 'Midoria',
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${MOCK_DEFAULT_ID}`,
            headers,
            payload: JSON.stringify(HERO_UPDATE)
        })

        const statusCode = result.statusCode;
        const {
            message
        } = JSON.parse(result.payload);

        assert.ok(statusCode === 200)
        assert.deepEqual(message, 'Hero updated')

    })

    it('update a hero method PATCH on /heroes/:id - Should not update a hero with incorrect ID', async () => {
        const HERO_UPDATE = {
            name: 'Midoria',
        }
        _id = '5cff0c1febae436c51d1a308'

        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            headers,
            payload: JSON.stringify(HERO_UPDATE)
        })

        const statusCode = result.statusCode;
        const data = JSON.parse(result.payload)

        const expected = {
            "statusCode": 412,
            "error": "Precondition Failed",
            "message": "ID not found in database"
        }

        assert.ok(statusCode === 412)
        assert.deepEqual(data, expected)

    })

    it('remove a hero method DELETE on /heroes/:id', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/heroes/${MOCK_DEFAULT_ID}`,
            headers
        })

        const statusCode = result.statusCode;
        const {
            message
        } = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(message, 'Hero removed');
    })

    it('remove a hero method DELETE on /heroes/:id - should not remove ID correct', async () => {
        const _id = '5cff0c1febae436c51d1a308'

        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/heroes/${_id}`,
            
        })

        const statusCode = result.statusCode;

        const data = JSON.parse(result.payload);

        const expected = {
            "statusCode": 412,
            "error": "Precondition Failed",
            "message": "ID not found in database"
        }

        assert.deepEqual(statusCode, 412)
        assert.deepEqual(data, expected);
    })
})