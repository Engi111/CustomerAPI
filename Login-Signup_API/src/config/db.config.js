const mongoose = require("mongoose");
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);
const mongoCOnfig = {};

const connection = async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI);
        console.log("connected to db");
    } catch (error){
        console.log("Not connected"),error;
    }
}

module.exports = connection;