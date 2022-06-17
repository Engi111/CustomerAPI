require('dotenv').config()
const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");



// to create the new user
exports.createUser = async (db ,payload) => {
    const users = db.collection("users");
    const {email, password} = payload;  
    try {
    let user = await users.findOne({email})
    if(user) {
        throw new Error("message: Please login")
    }
    //hashed pass generate
    encryptedPassword = await bcrypt.hash(password,10);
    
    //save user in db
    await users.insertOne({email,password: encryptedPassword})


    //to create a token
const token = jsonwebtoken.sign({email},process.env.SECRET/*,{expiresIn: "1hr"}*/);

    await users.updateOne({email: {$eq : email}},{$set : {token}})

     return{sucess:true, messsge: "User created sucessfully", acivationLink: process.env.BASE_URL}      
    } catch (error) {
        throw error
    }
}
// tp get detail of a particular user
exports.getUser = async (db,id) => {
    try {

        return{messsge: "Get details of a user using id"}
    } catch (error) {
        throw error
    }
}

//to get details of the users
exports.getUsers = async () => {
    try {
        return{messsge: "Get details of user"}
    } catch (error) {
        throw error
    }
}

// to update the user's details
exports.updateUser = async ()  => {
    try {
        return{messsge: "Update the details of user"}
    } catch (error) {
        throw error
    }
}

// //to delete the existing user
exports.deleteUser = async () => {
    try {
        return{messsge: "To delete the user"}
    } catch (error) {
        throw error
    }
}