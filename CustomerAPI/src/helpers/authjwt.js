const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

const auth = async(req, res) => {
    const users = req.db.collection("users");
    const Token = db.collection("token")
    const token = req.header("Authorization") && req.header("Authorization").replace("Bearer ", "")
    
    try {
        if(!token) throw new Error('Token is required')
         const data = jwt.verify(token, process.env.TOKEN_KEY)
         const user = await req.db.collection("user").findOne({_id: ObjectId(req.params.userId)});
        if (!user) {
            throw new Error()
        }
        req.user = data  
        req.token = token
        return next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Not authorized to access! Invalid Token"});
    }                                           
};
 module.exports = auth;