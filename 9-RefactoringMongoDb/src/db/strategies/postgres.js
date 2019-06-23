const ICrud = require('./intefaces/intefaceCrud')
const Sequelize = require('sequelize');


class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._heroes = null
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.error('Tou is not connected into the database', error)
            return false;
        }
    }

    async create(item) {
        const {
            dataValues
        } = await this._heroes.create(item);

        return dataValues
    }

    async read(query) {
        return this._heroes.findAll({
            where: query,
            raw: true
        })
    }

    async update(id, item) {
        return this._heroes.update(item, {
            where: {
                id
            }
        })
    }

    async delete(id) {
        const query = id ? {
            id
        } : {}
        return this._heroes.destroy({
            where: query
        })
    }
    async defineModel() {
        this._heroes = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                required: true
            },
            power: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROES',
            freezeTableName: false,
            timestamps: false
        })

        await this._heroes.sync();

    }

    async connect() {
        this._driver = new Sequelize(
            'heroes', //databse name
            'estevaowat', //database login
            '4321', //password database
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false
            } // options
        )
        await this.defineModel();
    }

}

module.exports = Postgres