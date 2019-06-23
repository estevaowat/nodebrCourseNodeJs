const ICrud = require('./intefaces/intefaceCrud')

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('Hero was created in Postgres database')
    }
}

module.exports = Postgres