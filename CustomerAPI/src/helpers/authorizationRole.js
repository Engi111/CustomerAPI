const jwt = require("jsonwebtoken");
const config = process.env;
const { TOKEN_KEY } = process.env;
const { unauthorizedError } = require("../utils/error-handler");
const auth = require("./authjwt");

const authorize = (Roles = []) => {
  //to authorize the user 
  let isauthorized = true; //creating flag 
  
  return (req, res, next) => {
    const user = req.user;
    isauthorized = typeof Roles == "string" ? Roles == user.role : Roles.find((role) => user.role == role);
    if (!isauthorized) {
      return res.status(400).send("Unauthorized access");
    }
  
    next();
  };
}

module.exports = authorize;
