const {compare} = require("../utils/compare_pass");
const  jwt = require("jsonwebtoken");
const {unauthorizedError} = require("../utils/error-handler"); 
const ObjectId = require("mongodb").ObjectId;
const {SECRET } = process.env;


exports.login = async(db, payload) =>{
    const users = db.collection("users");
    const {email, password} = payload;  
    let isPasswordValid = false;
    try {
        const existedUser = await users.findOne({email});
        

        if (existedUser) {
            isPasswordValid = await compare(password,existedUser.password);
        }
        if (!existedUser || !isPasswordValid) throw new Error("Invalid credentials");

        
        //to create a token
        const token = jsonwebtoken.sign({email},process.env.SECRET/*,{expiresIn: "1hr"}*/);

        //save user in db
        // let insertedUser = await users.insertOne({email,password: encryptedPassword, token });
        // return{sucess:true, messsge: "Logged in sucessfully", insertedUser}; 


        return{sucess:true, messsge: "Logged in sucessfully",token}; 
    } catch (error) {
        throw error
    }
};

exports.linkActivation = async(db, token, userid) => {
    try {
        //find user
        const user = await db.collection("users").findOne({_id: ObjectId(userid)});
        if (!user) throw new Error("invalid activation token");

        //check if token is valid
        const existToken = await db.collection("users").findOne({    
            token,
            _id: ObjectId(userid),
        });
        if(!token) throw new Error("Invalid link or expired"); 

        jwt.verify(token, SECRET, function(err, decoded){
            if(err){
                throw new Error({message: err.message})
            }
        })
        const setStatus = await db.collection("users").updateOne({
            _id: ObjectId(userid)},
            {  
                $set:{
                    activated: true
                }
            });
        return {
            sucess: true,
            message: "Your account is verified"
        }
    } catch (error) {
        throw(error)
    }
}

exports.logout = async() => {
    try {
        
    } catch (error) {
        throw (error)
    }
};

