const services = require('./services');

async function main() {
    try {
        const result = await services.getStarWarsPeople('a');
        console.time('map');
        
        const names = result.results.map(function(person){
            return person.name;
        });
        console.log(names);
        
        console.timeEnd('map');
    } catch (error) {
        console.error('Ops bro! Something went wrong.', error);
    }
}

main();