const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, header) => {

                const {
                    skip,
                    limit,
                    name
                } = request.query;

                let query = {}
                if (name) {
                    query = {
                        name: name
                    }
                }

                if (isNaN(skip))
                    throw new Error('Skip type is incorrect')


                if (isNaN(limit))
                    throw new Error('Skip type is incorrect')


                return this.db.read(query, parseInt(skip), parseInt(limit))
            }
        }
    }
}

module.exports = HeroRoutes