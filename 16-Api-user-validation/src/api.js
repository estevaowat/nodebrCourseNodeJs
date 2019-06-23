//npm i hapi
//npm i vision inert hapi-swagger
//npm i hapi-auth-jwt2
//npm i bcrypt
const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const Postgres = require('./db/strategies/postgres/postgres')
const userSchema = require('./db/strategies/postgres/schemas/userSchema')
const heroSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroRoutes = require('./routes/heroRoutes')
const AuthRoutes = require('./routes/authRoutes')
const HapiAuthJwt = require('hapi-auth-jwt2')
const MY_SECRET = 'MY_BIG_SECRET_123';
const Bcrypt = require('bcrypt')

const app = Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}


async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, heroSchema))
    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPostgres, userSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, model))

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
        validate: async (data, request) => {
            const [user] = await contextPostgres.read({
                username: data.username.toLowerCase()
            })

            if (!user)
                return {
                    isValid: false
                }
            return {
                isValid: true
            }
        }

    })

    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(MY_SECRET, contextPostgres), AuthRoutes.methods())
    ])


    app.start();
    console.log('app is running on port ', app.info.port)

    return app;

}

module.exports = main()