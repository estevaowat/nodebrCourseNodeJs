const {
    getStarWarsPeople
} = require('./services');

async function main() {
    try {
        const {
            results
        } = await getStarWarsPeople('a');

        const heightPeople = results.map((person) => parseInt(person.height));
        const totalHeight = heightPeople.reduce((previous, current) => previous + current)

        console.log(totalHeight);

    } catch (error) {
        console.error('Ops bro! Something went wrong.', error);
    }

}

main();