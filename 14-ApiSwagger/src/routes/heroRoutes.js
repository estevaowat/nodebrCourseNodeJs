const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const failAction = (request, header, error) => {
    throw error
};

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Should list heroes',
                notes: 'Could paginate and skip values',
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(0),
                        name: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request) => {
                try {
                    const {
                        skip,
                        limit,
                        name
                    } = request.query;

                    const query = {
                        name: {
                            $regex: `.*${name}*.`
                        }
                    }

                    return this.db.read(name ? query : {}, skip, limit)
                } catch (error) {
                    console.log('Ops! Something went wrong', error)
                    return Boom.internal();
                }
            }
        }
    }

    create() {
        return {
            path: '/heroes',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'create a hero',
                notes: 'create a hero passing a name and a power',
                validate: {
                    failAction,
                    payload: {
                        name: Joi.string().min(3).max(100),
                        power: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {
                        name,
                        power
                    } = request.payload

                    const result = await this.db.create({
                        name,
                        power
                    })

                    return {
                        message: 'Hero created',
                        _id: result._id
                    }
                } catch (error) {
                    console.log('Ops! Something went wrong', error)
                    return Boom.internal();
                }
            }
        }
    }

    update() {
        return {
            path: '/heroes/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'update a hero',
                notes: 'update a hero using a id',
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()

                    },
                    payload: {
                        name: Joi.string().min(3).max(100),
                        power: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {
                        id
                    } = request.params;

                    const payload = JSON.stringify(request.payload);
                    const item = JSON.parse(payload)

                    const result = await this.db.update(id, item);

                    if (result.nModified !== 1)
                        return Boom.preconditionFailed('ID not found in database')

                    return {
                        message: 'Hero updated'
                    }

                } catch (error) {
                    console.log('Ops! Something went wrong', error)
                    return Boom.internal();
                }
            }
        }
    }

    delete() {
        return {
            path: '/heroes/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'remove a hero',
                notes: 'remove a hero using a ID',
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    },
                }
            },
            handler: async (request) => {
                try {
                    const {
                        id
                    } = request.params;

                    const result = await this.db.delete(id);

                    if (result.n !== 1)
                        return Boom.preconditionFailed('ID not found in database')

                    return {
                        message: 'Hero removed',
                    }

                } catch (error) {
                    console.log('Ops! Something went wrong', error)
                    return Boom.internal();
                }

            }
        }

    }
}

module.exports = HeroRoutes