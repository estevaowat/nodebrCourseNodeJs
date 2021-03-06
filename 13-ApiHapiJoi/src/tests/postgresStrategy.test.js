const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const Context = require('./../db/strategies/base/contextStrategy')
const heroSchema = require('./../db/strategies/postgres/schemas/heroSchema')


const MOCK_CREATE_HERO = {
    name: "Iron Man",
    power: "Intelligence"
}

const MOCK_UPDATE_HERO = {
    name: 'Wonder Woman',
    power: "Strength"
}

let contextPostgres = {}
describe('Tests Suits Postgres \n', function () {
    this.timeout(Infinity);
    this.beforeAll(async function () {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, heroSchema)
        contextPostgres = new Context(new Postgres(connection, model))
        await contextPostgres.delete();
        await contextPostgres.create(MOCK_UPDATE_HERO)
    });

    it('PostgresSQL connection', async function () {
        const result = await contextPostgres.isConnected();
        assert.equal(result, true);
    });

    it('create a hero', async function () {
        const result = await contextPostgres.create(MOCK_CREATE_HERO);
        delete result.id;
        assert.deepEqual(result, MOCK_CREATE_HERO)
    })

    it('list a selected hero', async function () {
        const [result] = await contextPostgres.read(MOCK_CREATE_HERO);
        delete result.id
        assert.deepEqual(result, MOCK_CREATE_HERO)
    })

    it('update a hero', async function () {

        const [heroUpdate] = await contextPostgres.read({
            name: MOCK_UPDATE_HERO.name
        });

        const newItem = {
            ...MOCK_UPDATE_HERO,
            name: "Naruto"
        }
        
        const [updateResult] = await contextPostgres.update(heroUpdate.id, newItem);
        const [heroUpdated] = await contextPostgres.read({
            id: heroUpdate.id
        })

        assert.deepEqual(heroUpdated.name, newItem.name);
    })
    it('delete a hero', async function(){
        const [hero] = await contextPostgres.read({});

        const result = await contextPostgres.delete(hero.id);

        assert.deepEqual(result, 1);

    })
})