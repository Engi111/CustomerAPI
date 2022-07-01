const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const ObjectId = require("mongodb").ObjectId;

const auth = async(req, res, next) => {
    // const users = req.db.collection("users");
    // const Token = req.db.collection("token")
    const token = req.header("Authorization") && req.header("Authorization").replace("Bearer ", "")
    
    try {
        if(!token) {throw new Error('Token is required')}
        const data = jwt.verify(token, process.env.SECRET)
        const user = await req.db.collection("users").findOne({email: data.email});
        if (!user) {
            throw new Error()
        }
        req.user = {...data, role:user.role}  
        return next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Not authorized to access! Invalid Token"});
    }                                           
};
 module.exports = auth;