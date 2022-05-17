//creating a model using mongoose scheme
//consist name email and password with min & max lengths with required
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 80,
    },
    email: {
        type: String,
        required: true,
        min: 12,
        max: 80,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 16,
    },  
});

module.exports = mongoose.model("User", userSchema);
