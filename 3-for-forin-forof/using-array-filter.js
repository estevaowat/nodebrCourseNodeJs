const {
    getStarWarsPeople
} = require('./services');

async function main() {
    try {
        const {
            results
        } = await getStarWarsPeople('a');

        const familySkyWalker = results.filter((person) => person.name.toLowerCase().indexOf('skywalker') !== -1);
        const namesSkyWalker = familySkyWalker.map((person) => person.name);
        console.log(namesSkyWalker);

    } catch (error) {
        console.error('Ops bro! Something went wrong', error);
    }
}
main();