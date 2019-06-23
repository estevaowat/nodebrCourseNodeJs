//npm i hapi
//npm i vision inert hapi-swagger
//npm i hapi-auth-jwt2

const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const heroSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroRoutes = require('./routes/heroRoutes')
const AuthRoutes = require('./routes/authRoutes')
const HapiAuthJwt = require('hapi-auth-jwt2')
const MY_SECRET = 'MY_BIG_SECRET_123';


const app = Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}


async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, heroSchema))

    const optionSwagger = {
        info: {
            title: 'API Heroes - #NodeBR',
            version: 'v1.0'
        }
    }

    await app.register([
        HapiAuthJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: optionSwagger
        }
    ])
    app.auth.strategy('jwt', 'jwt', {
        key: MY_SECRET,
        // options:{
        //      expiresIn:20
        // },
        validate: (data, request) => {

            return {
                isValid: true
            }
        }

    })

    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(MY_SECRET), AuthRoutes.methods())
    ])


    app.start();
    console.log('app is running on port ', app.info.port)

    return app;

}

module.exports = main()