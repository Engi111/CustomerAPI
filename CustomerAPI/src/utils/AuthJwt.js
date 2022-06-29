const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;
const {Unauthorized} = require("../utils/error-handler");

const TOKEN_SECRET = process.env.TOKEN_SECRET

exports.verifyToken = (token) => {
    try {
        var decoded = jwt.verify(token,TOKEN_SECRET);
    } catch(error) {
        console.log(error)
        decoded = {error: 'Token expired!'};
        throw new Unauthorized(error.message)
    }
    return decoded;
}