const ICrud = require('./../intefaces/intefaceCrud');
const Mongoose = require('mongoose');
const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconneting'
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }

    async isConnected() {

        const state = STATUS[this._connection.readyState]
        if (state === 'Conected') return state;
        if (state !== 'Connecting') return state;

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]

    }

    create(item) {
        return this._schema.create(item);
    }

    read(query, skip = 0, limit = 10) {
        return this._schema.find(query).skip(skip).limit(limit);
    }

    delete(id) {
        return this._schema.deleteOne({
            _id: id
        });
    }

    update(id, item) {
        return this._schema.updateOne({
            _id: id
        }, {
            $set: item
        })
    }
    
    static connect() {
        Mongoose.connect('mongodb://estevaowat:4321@localhost:27017/heroes', {
            useNewUrlParser: true
        }, function (error) {
            if (!error)
                return;
            console.log('Falha na conexao com o mongo db', error)
        })
        const connection = Mongoose.connection
        connection.once('open', () => {
            console.log("database running!")
        });

        return connection;

    }
}

module.exports = MongoDB