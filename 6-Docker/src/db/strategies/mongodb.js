const ICrud = require('./intefaces/intefaceCrud')
 
class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('Hero was created in mongoDB database')
    }
}

module.exports = MongoDB