const {
    deepEqual,
    ok
} = require('assert');

const DEFAULT_HERO = {
    id: 1,
    name: 'Flash',
    power: 'Speed'
};

const DEFAULT_HERO_UPDATE = {
    id: 2,
    name: 'Green Lantern',
    power: 'Green ring'
};

const database = require('./database');

describe('Manipulation Suit of Heroes', () => {
    before(async () => {
        await database.insert(DEFAULT_HERO);
        await database.insert(DEFAULT_HERO_UPDATE); 
    });

    it('Should search a hero, using a file', async () => {
        const expected = DEFAULT_HERO;
        const [result] = await database.search(expected.id);
        deepEqual(result, expected);
    });

    it('Should insert a hero, using a file', async () => {
        const expected = DEFAULT_HERO;
        await database.insert(expected);
        const [result] = await database.search(expected.id)
        deepEqual(result, expected);
    });

    it('Should remove a hero', async () => {
        const expected = true;
        const result = await database.remove(DEFAULT_HERO.id);
        deepEqual(result, expected);
    });

    it.only('Should update a hero by id', async() => {
        const expected = {
            ...DEFAULT_HERO_UPDATE,
            name: 'Batman',
            power:'money'    
        }
        
        const modifications = {
            name: 'Batman',
            power:'money'    
        }

        await database.update(DEFAULT_HERO_UPDATE.id, modifications);
        const [result] = await database.search(DEFAULT_HERO_UPDATE.id);
        deepEqual(result, expected);
    });


});