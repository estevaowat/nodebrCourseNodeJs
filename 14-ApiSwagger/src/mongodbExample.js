const Mongoose = require('mongoose');

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

setTimeout(() => {
    const state = connection.readyState
    console.log(state);
}, 1000);


const heroSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});

const model = Mongoose.model('heroes', heroSchema)

async function main() {
    const resultCreate = await model.create({
        name: 'Batman',
        power: 'Money'
    });

    console.log('resultCreate', resultCreate)

    const listFind = await model.find({})
    console.log('listFind', listFind);

}

main();