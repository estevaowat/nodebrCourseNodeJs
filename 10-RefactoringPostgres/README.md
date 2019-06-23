## -- Upload postgres container
docker run \
    --name postgres \
    -e POSTGRES_USER=estevaowat \
    -e POSTGRES_PASSWORD=4321 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres 

docker ps
docker exec -it postgres /bin/bash

## -- Upload adminer container
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## -- MONGODB

## -- Upload mongodb container
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -d \
    mongo:4

## -- Upload mongodb client to test database connection
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient


##-- command to create a databse and a user giving to user his roles in mongodb
docker exec -it mongodb \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user:'estevaowat', pwd:'4321', roles: [{role:'readWrite', db:'heroes'}]})"