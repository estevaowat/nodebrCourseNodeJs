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
    isConnected(){
        throw NotImplementedException();
    }
}


 module.exports = ICrud;