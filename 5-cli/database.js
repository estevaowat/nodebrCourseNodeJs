const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'heroes.json';
    }

    async getDataOnFile() {
        const file = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(file.toString())
    }
 
    async writeDataOnFile(data) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(data))
        return true;
    }

    async insert(hero) {
        const data = await this.getDataOnFile();
        const id = hero.id <= 2 ? hero.id : Date.now();
        const heroWithId = {
            id,
            ...hero
        };
        const dataFinal = [
            ...data,
            heroWithId
        ];

        return await this.writeDataOnFile(dataFinal);
    }

    async search(id) {
        const dataJson = await this.getDataOnFile();
        const dataJsonFiltered = dataJson.filter(item => {
            return id ? item.id == id : true;
        })
        return dataJsonFiltered;
    }

    async remove(id) {
        if(!id){
            return await this.writeFileAsync([]);
        }

        const data = await this.getDataOnFile();
        const index = data.findIndex(element => element.id === parseInt(id));
        
        if (index === -1){
            throw Error('Hero informed does not exists')
        }
        else {
            data.splice(index, 1 );
            return await this.writeDataOnFile(data);
        }
    }

    async update(id, modifications){
        const heroes = await this.getDataOnFile();
        const indexHeroForUpdate = heroes.findIndex(element => element.id === id);
        
        if(indexHeroForUpdate === -1){
            throw Error("Hero is not in the system");
        }
        
        const heroForUpdate = heroes[indexHeroForUpdate];
        const heroUpdated = {
            ...heroForUpdate,
            ...modifications
        }
        heroes.splice(indexHeroForUpdate, 1)

        const heroesUpdated = {
            ...heroes,
            heroUpdated
        }
        
    return await this.writeDataOnFile([
        ...heroes,
            heroUpdated
    ])
    }
};


module.exports = new Database();