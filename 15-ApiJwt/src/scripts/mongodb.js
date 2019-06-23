// bc3ce3b5b48e
//docker exec -it bc3ce3b5b48e mongo -u admin -p admin --authenticationDatabase admin

// show databases in mongodb
//show dbs 

// change the context database
//use heroes

// show tables(collections ) in monogdb
//show collections

//count registers
db.heroes.count()

db.heroes.find().limit(500).sort({
    name: -1
})
db.heroes.find({}, {
    power: 1,
    _id: 0
})

//create
db.heroes.insert({
    name: 'Flash',
    power: 'Speed',
    birthday: '1998-01-01'
})

//read
db.heroes.find().pretty()

// update
db.heroes.update({})

db.heroes.find({
    _id: ObjectId("5cf717c7b8a69224a28f4546")
})

db.heroes.update({
    _id: ObjectId("5cf717c7b8a69224a28f4546")
}, {
    name: 'Naruto'
})

db.heroes.update({
    _id: ObjectId("5cf71d98b8a69224a28f6c49")
}, {
    $set: {
        name: 'Naruto Uzumaki'
    }
})

db.heroes.findOne({_id: ObjectId("5cf71d98b8a69224a28f6c49")})

//remove 
db.heroes.remove({}) //remove all heroes from collection
db.heroes.remove({_id: ObjectId("5cf71d98b8a69224a28f6c49")})

//Kage bushin no jutsu! Populate collection with bushins
for (i = 0; i <= 10000; i++) {
    db.heroes.insert({
        name: `clone-${i}`,
        power: 'bushin',
        birthday: '2019-06-04'
    })
}