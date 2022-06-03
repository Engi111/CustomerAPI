const jwt = require("jsonwebtoken");
const config = process.env; 
const {User} = require("../models/user.model")

const auth = async(req, res, next) => {
    const token = req.header("Authorization") && req.header("Authorization").replace("Bearer ", "")
    
    try {
        if(!token) throw new Error('Token is required')
         const data = jwt.verify(token, process.env.TOKEN_KEY)
        const user = await User.findById(data.user_id)
        if (!user) {
            throw new Error()
        }
        req.user = data
        req.token = token
        return next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error: "Not authorized to access"})
    }
};
 module.exports = auth;