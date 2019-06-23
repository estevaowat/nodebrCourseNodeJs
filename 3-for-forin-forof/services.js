const axios = require('axios');
const URLPEOPLE = 'https://swapi.co/api/people';

async function getStarWarsPeople(name){
    const url = `${URLPEOPLE}/?search=${name}&format=json`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = {
    getStarWarsPeople
}