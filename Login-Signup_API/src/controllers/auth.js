const {User} = require("../models/user.model")
const bcrypt = require("bcrypt")
const express = require("express")
const jwt = require("jsonwebtoken")
// const { route } = require("../routers")
const user = require("../models/user.model")
const { genSalt } = require("bcrypt")
require('dotenv').config();


//for login
exports.login = async(req,res,next) => {
    try {
        //to get user input
        const {email, password} = req.body;

        //to validate user's credentials
        if (!(email && password)) {
            res.status(400).json({msg : "Inputs Required"});
        }

        //to check if user exist in db
        const user = await User.findOne({email});
        
        if (!user || user && !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Invalid Credentials. Cannot Login");
            
        }
        //create token
        const token = jwt.sign(
            {user_id:user._id,role : user.role},
            process.env.TOKEN_KEY,
            // {
            //     expiresIn: "1h",
            // }
        );

    //save user token
    user.token =token;

    //res token
    res.status(200).json({data:user,token});
    } catch (err) {
        console.log(err);
    }
};

// change user password

exports.change_password = async (req,res,next) => {

const {oldPassword, newPassword} = req.body;

const id = req.user.user_id

try{
    if(!oldPassword || !newPassword ) throw new Error('oldPassword and newPassword are required')
    
    const existUser = await User.findById(id)
    
    if(!existUser) throw new Error('Cannot get user!')
    
    // compare the previous password
    if(! await bcrypt.compare(oldPassword,existUser.password)) throw new Error('Old password does not match');
     
    // new password cannot be old password
    if( await bcrypt.compare(newPassword,existUser.password)) throw new Error('New password cannot be old password');
    
    // replace the old password
    const newPasswordHash = await bcrypt.hash(newPassword,10)
    
    await User.findOneAndUpdate({_id: id},{password: newPasswordHash})
     
    // TODO : logout user
    // await Sessions.findOneAndUpdate({user_id: id},{is_valid: false})
    
    
    
    
    return {
    
    success: true,
    
    message: "Password change successful!"
    
    }
    
    
    
    }catch(error) {
    
    res.status(500).send(error.message)
    
    }
    
}


const router = require("express").Router();
