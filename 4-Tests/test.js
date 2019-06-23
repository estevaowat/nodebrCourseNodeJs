const assert = require('assert');
const nock = require('nock');
const {
    getStarWarsPeople
} = require('./services');

describe('Test StarWars API', function(){
    this.beforeAll(function(){
        const response = {
            count: 1,
            next: null,
            previous: null,
            results: [{
                name: 'R2-D2',
                height: '96',
                mass: '32',
                hair_color: 'n/a',
                skin_color: 'white, blue',
                eye_color: 'red',
                birth_year: '33BBY',
                gender: 'n/a',
                homeworld: 'https://swapi.co/api/planets/8/',
                vehicles: [],
                starships: [],
                created: '2014-12-10T15:11:50.376000Z',
                edited: '2014-12-20T21:17:50.311000Z',
                url: 'https://swapi.co/api/people/3/'
            }]
        }

        nock('https://swapi.co/api/people')
            .get('/?search=R2-D2&format=json')
            .reply(200, response)
    });

    it('should search r2-d2 with the correct format', async () => {
        const expected = [{
            name: 'R2-D2',
            height: '96'
        }];

        const nameParameter = 'R2-D2';
        const result = await getStarWarsPeople(nameParameter);
        assert.deepEqual(result, expected);

    })
})