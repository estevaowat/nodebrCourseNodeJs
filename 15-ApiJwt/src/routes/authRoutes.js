// npm i jsonwebtoken

const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')

const failAction = (request, header, error) => {
    throw error
};

const USER = {
    username: 'estevaowat',
    password: '123'
}

class AuthRoutes extends BaseRoute {
    constructor(secret) {
        super();
        this._secret = secret
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Get a TOKEN',
                notes: 'Using a username and a password to get a JWT',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request, headers) => {
                const {
                    username,
                    password
                } = request.payload

                if (username !== USER.username ||
                    password !== USER.password)
                    return Boom.unauthorized();

                const token = Jwt.sign({
                    username,
                    id: 1
                }, this._secret)
                return {
                    token
                }
            }
        }
    }
}

module.exports = AuthRoutes