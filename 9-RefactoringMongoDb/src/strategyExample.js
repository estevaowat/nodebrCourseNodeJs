class NotImplementedException extends Error {
    constructor() {
        super('Not implemented Exception ')
    }
}

class ICrud {

    create(item) {
        throw NotImplementedException();
    }
    read(query) {
        throw NotImplementedException();
    }
    update(id, item) {
        throw NotImplementedException();
    }
    delete(id) {
        throw NotImplementedException();
    }
}

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('Hero was created in mongoDB database')
    }
}

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('Hero was created in Postgres database')
    }
}

class ContextStrategy {
    constructor(strategy) {
        this._database = strategy;
    }

    create(item) {
        return this._database.create(item);
    }

    read(query) {
        return this._database.read(query);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id)
    }
}

const contextMongoDB = new ContextStrategy(new MongoDB());
const contextPostgres = new ContextStrategy(new Postgres());

contextMongoDB.create();
contextPostgres.create();

contextMongoDB.read();
