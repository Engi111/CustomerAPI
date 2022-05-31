const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const express = require("express")
const jwt = require("jsonwebtoken")
const { route } = require("../routers")
const user = require("../models/user.model")
const { genSalt } = require("bcrypt")
require('dotenv').config();

//to register
exports.register = async(req,res, next) => {
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
    //To encrypt user's password

    encryptedPassword = await bcrypt.hash(password, genSalt(10));
    //To create user in the database

    const user = await User.create({
        name,
        email: email.toLowerCase(), //samitizing with lower case
        password: encryptedPassword,
    });
    // //to create token

    // const token = jwt.sign(
    //     {user_id: user._id, email},
    //     process.env.TOKEN_KEY,
    //     {
    //         expiresIn: "10h",
    //     }
    // );

    // // return new user with token
    res.status(201).json({
        data: user,
        
    });

   } catch (err) {
    console.log(err);   
   }     
};

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

        if (user && !(await bcrypt.compare(password, user.password))) {
            res.status(400).send("Invalid Credentials. Cannot Login");

        }
        //create token
        const token = jwt.sign(
            {user_id:user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );

    //save user token
    user.token =token;

    //res token
    res.status(200).json({data:user,token});
    } catch (err) {
        console.log(err);
    }
};



const router = require("express").Router();
