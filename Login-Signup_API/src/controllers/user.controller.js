const userServices =  require('../services/user.services')
const User = require("../models/user.model");
const req = require("express/lib/request");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_APIKEY);
const jsonwebtoken = require("jsonwebtoken");



// register
exports.createUser = async (req, res, next) => {
    const user = await User.create(req.body)
    const {name, email, password} = req.body
    const token = jsonwebtoken.sign({name,email},process.env.SECRET,{expiresIn: "1hr"});
    //sending mail
    const msg = {
        from: "khadkaengina111@gmail.com",
        to: email,
        subject: "Hello this is a mail for you",

        html:`
        <h2>Please click the following link to activate your account</h2>
        <p>${process.env.BASE_URL}/authentication/activate/${token}</p>
        `
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log("Email Sent")
        })
        .catch((error) =>{
            console.log(error)
        }) 
    
    //to find existing user in db
    const oldUser = await User.findOne({email});

    if (oldUser) {
        return res.status(409).send("User already exist. Please login");
    }
    //To encrypt user's password

    encryptedPassword = await bcrypt.hash(password, genSalt(10));

    res.status(201).json({
        sucess: true, data: user, msg:"show users"
    })
}



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
    try {
        const test= "OKAY TEST"
        const user = await User.find();
        res.status(200).json({sucess: true, data: user, msg: "to get the details of the registered users" });
    } catch (error) {
      res.status(400).json({sucess:false});  
    }  
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