const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const Token  = require("../models/token");
const {User} = require("../models/user.model");
const sendMail = require('../utils/sendEmail');
const details = require("../routers/users")


//to register
exports.createUser = async(req,res, next) => {
    try {
     const {name, email, password} = req.body;
     //to validate user input
 
     if (!(email && password && name)) {
         res.status(400).send("Input Required");
     }
     // to check if user already exists through db
 
     const oldUser = await User.findOne({email});
 
     if (oldUser) {
         return res.status(409).send("User already exist. Please login");
     }
 
     // //to create token
     const token = jsonwebtoken.sign({name,email},process.env.SECRET,{expiresIn: "1hr"});
     
     //To encrypt user's password
      encryptedPassword = await bcrypt.hash(password,10);
     
     //To create user in the database
      const user = await User.create({
         name,
         email: email.toLowerCase(), //samitizing with lower case
         password: encryptedPassword,
     });
     
      await Token.create({
         userId: user.id,
         token,
     })
     
     let messageOptions = {
         to: email,
        subject: "Verify your account",
        content: `
        <h2>Please click the following link to activate your account</h2>
        <p>${process.env.BASE_URL}/auth/activate/${token}</p>
        `
    }
    
    // send mail
     let value = await sendMail(messageOptions);
     if (value?.error) throw new Error (value.error)

     res.status(201).json({
         data: user,
         verificationUrl: `${process.env.BASE_URL}/auth/activate/${token}`
         
     });
 
    } catch (err) {
     console.log(err);   
    }     
 };


//to get details of registered user
exports.getUser = async (req, res, next) => {
    try {
        let message= "to show details of the user" 
        const user = await User.findById(req.params.id);
        if(!user) message = "User not found"
        res.status(200).json({sucess: true, data: user, message});
    } catch (error) {
        console.log(error)
      res.status(400).json({
        message: 'Invalid user id format',  
        sucess:false});  
    }  
}
//to get details of registered users

exports.getUsers = async (req, res, next) => {

    //pagination
    let {page, limit,name} = req.query;
    page = parseInt(page)
    limit = parseInt(limit)
    try {
        const resposedata = await User.find({name:{$regex: "Eng"}})
        // .limit(limit * 1)
        // .skip((page - 1) * limit)
        // .sort({name: -1})
        .exec();
        return res.status(200).json({sucess: true, data: resposedata, msg: "to get the details of the registered users" });

    } catch (err) {
        console.log(err.message);
    }

    // try {
    //     const test= "OKAY TEST"
    //     const user = await User.find();
    //     res.status(200).json({sucess: true, data: user, msg: "to get the details of the registered users" });
    // } catch (error) {
    //   res.status(400).json({sucess:false});  
    // }  
}
//to update the registered users
exports.updateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })
    if(!user){
    return res.status(400).json({sucess: true, data: user, msg: "show users updated " });
    }
    res.status(200).json({sucess:true, data:user, msg:"error"})
}
exports.deleteUser = async (req, res, next) => {
    res.status(200).json({sucess: true, msg: "delete users " });
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).json({sucess: false});
        }
        res.status(200).json({sucess:true, data:{}})
    } catch (error) {
        res.status(400).json({sucess:false});
    }
}
//



const router = require("express").Router();