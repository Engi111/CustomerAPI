const bcrypt = require("bcrypt");
require("dotenv").config()

const SALT = process.env.SALT;

//to hash password
exports.hash = async() => {
try {
    const hashedPassword = await bcrypt.hash(password, SALT);
    return hashedPassword;
} catch (error) {
    return new Error ("Password cannot be hashed")
}
}

//to compare
exports.compare = async(password,hash) => {
try {
    const result = await bcrypt.compare(password, hash);
    return result;
} catch (error) {
    return new Error ("Cannot compare password");
}
}