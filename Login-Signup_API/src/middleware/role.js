const jwt = require("jsonwebtoken");
const config = process.env;
const { TOKEN_KEY } = process.env;
const {unauthorizedError} = require("./error-handler");
const authJwt = require("./authJwt");

const authorize = (Roles=[]) =>{

   return (req, res, next) => {
       //to authorize the user 
       let isauthorized = false; //creating flafg
       const user = req.user;
       isauthorized = typeof Roles == "string" ? Roles == user.role : Roles.find(role => user.role == role);

        if (!isauthorized) {
            return res.status(400).send('Unauthorized access')
        }

    next();
   };    
};


module.exports= authorize;