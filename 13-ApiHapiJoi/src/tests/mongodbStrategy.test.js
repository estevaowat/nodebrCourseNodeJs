const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const HeroSchema = require('./../db/strategies/mongodb/schemas/heroesSchema')
const Context = require('./../db/strategies/base/contextStrategy')

let contextMongoDb = {}
const MOCK_CREATE_HERO = {
    name: 'Saitama',
    power: 'One punch KO'
}

const MOCK_HERO_DEFAULT = {
    name: `Naruto bushin - ${Date.now()}`,
    power: 'Bushin'
}
 
const MOCK_HERO_UPDATE = {
    name: 'Tony Stark',
    power: 'Intelligence'
}

let MOCK_HERO_UPDATE_ID = ''

describe('Tests Suits MongoDB \n', function () {
    this.beforeAll(async () => {
        
        const connection = MongoDb.connect();
        contextMongoDb = new Context(new MongoDb(connection, HeroSchema))
        
        await contextMongoDb.create(MOCK_HERO_DEFAULT)
        const { id } = await contextMongoDb.create(MOCK_HERO_UPDATE)
        MOCK_HERO_UPDATE_ID = id;        
    })
    
    it('Validate connection with the database', async () => {
        const result = await contextMongoDb.isConnected()
        const expected = 'Connected';

        assert.deepEqual(result, expected)
    })
    it('Create a hero', async () => {

        const {
            name,
            power
        } = await contextMongoDb.create(MOCK_CREATE_HERO);
        assert.deepEqual({
            name,
            power
        }, MOCK_CREATE_HERO)

    })

    it('Find a hero', async () => {
        const [{
            name,
            power
        }] = await contextMongoDb.read({
            name: MOCK_HERO_DEFAULT.name
        })
        const result = {
            name,
            power
        }
        assert.deepEqual(result, MOCK_HERO_DEFAULT)
    })

    it('Update a hero', async () => {
        const result = await contextMongoDb.update(MOCK_HERO_UPDATE_ID, {
            name: 'Iron Man'
        })
        
        assert.deepEqual(result.nModified, 1)
    })

    it('Remove a hero', async()=> {
        const result = await contextMongoDb.delete(MOCK_HERO_UPDATE_ID);

        assert.deepEqual(result.n, 1)

    })
})