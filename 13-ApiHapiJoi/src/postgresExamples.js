const Sequelize = require('sequelize');
const driver = new Sequelize(
    'heroes', //databse name
    'estevaowat', //database login
    '4321', //password database
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false
    } // options
)


async function main() {
    const Heroes = driver.define('heroes', {
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

    await Heroes.sync();
    // await Heroes.create({
    //     name:"Saitama",
    //     power: "One hit K.O"
    // })
     const result = await Heroes.findAll({
        raw: true, attributes:["name"]
    });

    console.log('result', result);
}

main();