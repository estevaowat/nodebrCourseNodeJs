const services = require('./services');

async function main() {
    try {
        const result = await services.getStarWarsPeople('a')
       
        forOfFunction(result);
        forOfFunction(result);
        forOfFunction(result);
      
    } catch (error) {
        console.error('Ops bro! Something went wrong', error)
    }
}

function forFunction(array) {
    console.time('for')

    let names = [];
    for (let i = 0; i < array.results.length - 1; i++) {
        const name = array.results[i].name;
        names.push(name);
    }
    console.log(names)

    console.timeEnd('for')
}

function forInFunction(array) {

    console.time('for-in')

    let names = [];
    for (let i in array.results) {
        const person = array.results[i];
        names.push(person.name);
    }
    console.log(names);

    console.timeEnd('for-in')
}

function forOfFunction(array) {
    console.time('for-of')

    let names = [];
    for (person of array.results) {
        names.push(person.name);
    }
    console.log(names);

    console.timeEnd('for-of')
}

main();