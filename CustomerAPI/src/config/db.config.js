((databaseHelper) => {

    'use strict';

    const { MongoClient, ServerApiVersion } = require('mongodb');

    const uri = "mongodb+srv://ek:326596@customerapi1.p3ivs.mongodb.net/Customerdb?retryWrites=true&w=majority"

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    databaseHelper.init = (app) => {
        client.connect(async (err) => {

            // const collection = client.db("test").collection("devices");
            //    await collection.insertOne({name: "test"})
            app.locals.db = client.db("APICustomer");

            // perform actions on the collection object
            console.log("Database Connection Success")

            // client.close()
        })
    }



})(module.exports);