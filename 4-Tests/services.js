const axios = require('axios');
const URL_API = 'https://swapi.co/api/people';


async function getStarWarsPeople(name) {
    const url = `${URL_API}/?search=${name}&format=json`;
    const result = await axios.get(url);
    console.log(result.data);
    return result.data.results.map(mapPeople);
}

function mapPeople(person) {
    return {
        name: person.name,
        height: person.height
    }
}

module.exports = {
    getStarWarsPeople
}