const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const heroSchema = require('./db/strategies/mongodb/schemas/heroesSchema')

const app = Hapi.Server({
    port: 5000
})

async function main() {
    try {

        const connection = MongoDb.connect();
        const context = new Context(new MongoDb(connection, heroSchema))

        app.route([{
            path: '/heroes',
            method: 'GET',
            handler: (request, header) => {
                return context.read()
            }
        }])
        app.start();
        console.log('app is running on port ', app.info.port)

    } catch (error) {
        console.error('Something went wrong', error)
    }

}

main()