require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");



const baseURL = process.env.BASE_URL;

// to create the new user
exports.createUser = async (db, payload) => {
  const users = db.collection("users");
  const { email, password } = payload;
  try {
    let user = await users.findOne({ email });
    if (user) {
      throw new Error("message: Please login");
    }
    //hashed pass generate
    encryptedPassword = await bcrypt.hash(password, 10);
    //to create a token
    const token = jsonwebtoken.sign(
      { email },
      process.env.SECRET /*,{expiresIn: "1hr"}*/
    );
    let role = payload.role || 'user';

    //save user in db
    let insertedUser = await users.insertOne({
      email,
      password: encryptedPassword,
      token,
      role,
      "created_at": new Date(),
      "updated_at": new Date(),

    });

    console.log(insertedUser.insertedId.toString());
    //to create a token

    // await users.updateOne({email: {$eq : email}},{$set : {token}})
    //to send activation link
    return {
      sucess: true,
      messsge: "User registered sucessfully",
      // insertedUser,
      email,
      acivationLink: `${baseURL}/api/auth/confirm/${token}/${insertedUser.insertedId.
        toString()}`,
    };
  } catch (error) {
    throw error;
  }
};

// tp get detail of a particular user
exports.getUser = async (db, id) => {
  const users = db.collection("users");
  try {
    return { messsge: "Get details of a user using id" };
  } catch (error) {
    console.log(err.message);
  }
};

//to get details of the users
exports.getUsers = async (db, id) => {

  try {
    const user = await req.db.collection("users").find({_id: ObjectId(req.params.userId)});
    return res.status(200).json({sucess: true, data: resposedata, msg: "Get details of user" });
  } catch (error) {
    console.log(err.message);
  }
};

// to update the user's details
exports.updateUser = async (req, res, next) => {
  try {
    const user = await req.db.collection("users").findOneAndUpdate({_id: ObjectId(req.params.userId)});
    if(!user){
    return res.status(400).json({sucess: true, data: user, msg: " users doesn't exist" });
    }
  return {sucess:true, data:user, msg:"user updated sucessfully"}
  } catch (error) {
    console.log(err.message);
  }
};

// //to delete the existing user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await req.db.collection("users").deleteOne({_id: ObjectId(req.params.userId)})
        if(!user){
            return res.status(400).json({sucess: false});
        }
        res.status(200).json({sucess: true, msg: "delete users sucessfully", data });

  } catch (error) {
    res.status(400).json({sucess:false});
    console.log(err.message);
  }
};
