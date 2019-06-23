const Commander = require('commander');
const database = require('./database');
const Hero = require('./hero');

async function main() {
    Commander.version('v1')
        .option('-n, --name [value]', "Hero s name")
        .option('-p, --power [value]', "Hero s power")
        .option('-i, --id [value]', "Hero s id")

        .option('-c, --create', "Create a hero")
        .option('-l, --list', "list all heroes")
        .option('-r, --remove', "remove a hero")
        .option('-u, --update [value]', "update a hero using a id")
        .parse(process.argv)

    const hero = new Hero(Commander)
    
    try {
        if (Commander.create) {
            delete hero.id

            const result = await database.insert(hero);
            if (!result) {
                console.error('Could not create the hero')
                return;
            }
            console.log('Hero created!')
        }
        if(Commander.list) {
            const result = await database.search(hero.id);
            console.log(result);
            return;
        }
        if(Commander.remove) {
            const result = await database.remove(hero.id);
            if(!result){
                console.error("Could not remove the hero")
                return;
            }
            console.log("Hero removed!")
        }
        if(Commander.update) {
            delete hero.id;

            const idToUpdate = parseInt(Commander.update);

            console.log(Commander.update);
            console.log('idToUpdate', idToUpdate)

            const modifications = JSON.parse(JSON.stringify(hero));

            const result = await database.update(idToUpdate, modifications);
            if(!result){
                console.error("Could not update the hero")
                return;
            }
            console.log("Hero updated")
            
        }

    } catch (error) {
        console.error('Ops bro! Something went wrong', error);
    }

}

main();