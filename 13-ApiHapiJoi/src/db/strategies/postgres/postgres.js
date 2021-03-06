const ICrud = require('./../intefaces/intefaceCrud')
const Sequelize = require('sequelize');


class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true;
        } catch (error) {
            console.error('Tou is not connected into the database', error)
            return false;
        }
    }

    async create(item) {
        const {
            dataValues
        } = await this._schema.create(item);

        return dataValues
    }

    async read(query) {
        return this._schema.findAll({
            where: query,
            raw: true
        })
    }

    async update(id, item) {
        return this._schema.update(item, {
            where: {
                id
            }
        })
    }

    async delete(id) {
        const query = id ? {
            id
        } : {}

        return this._schema.destroy({
            where: query
        })
    }
    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync();
        return model
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes', //databse name
            'estevaowat', //database login
            '4321', //password database
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                logging: false
            } // options
        )
        return connection
    }

}

module.exports = Postgres