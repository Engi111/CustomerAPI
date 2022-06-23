const {compare} = require("../utils/compare_pass");
const  jsonwebtoken = require("jsonwebtoken")

exports.activation = async() =>{
    return {message: "Acitavation"}
}

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