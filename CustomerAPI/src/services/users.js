require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

const baseURL = process.env.BASE_URL;

// to create the new user
/**
 *
 * @param {Object} db
 * @param {String} payload
 * @returns
 */
exports.createUser = async (db, payload, userid) => {
  const users = db.collection("users");
  const { email, password } = payload;
  try {
    let user = await users.findOne({ email});
    if (user) {
      throw new Error("message: Please login");
    }
    //hashed pass generate
    encryptedPassword = await bcrypt.hash(password, 10);
    //to create a token
    const token = jwt.sign(
      { _id: ObjectId(userid) },
      process.env.SECRET /*,{expiresIn: "1hr"}*/
    );
    let role = payload.role || "user";

    //save user in db
    let insertedUser = await users.insertOne({
      username,
      email,
      password: encryptedPassword,
      token,
      role,
      created_at: new Date(),
    });

    // console.log(insertedUser.insertedId.toString());
    //to create a token

    // await users.updateOne({email: {$eq : email}},{$set : {token}})
    //to send activation link

    if (insertedUser){
    return {
      sucess: true,
      messsge: "User registered sucessfully",
      // insertedUser,
      email,
      acivationLink: `${baseURL}/api/auth/confirm/${token}}}`,
    }
  }
  return {sucess: false ,message: "User registration failed"}  
  
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
exports.getUsers = async (db, id, userid, role) => {
  try {
    const data = await db.collection("users").find().toArray();
    return { sucess: true, msg: "The Users", data };
  } catch (error) {
    console.log(error);
  }
};

//to update the user's details
exports.updateUser = async (db, username,email,userid) => {
  try {
    const user = await db
      .collection("users")
      .findOne({ email});
    await db
    .collection("users")
    .updateOne({ _id: ObjectId(userid), $set :{username}});

    if (!user) {
      return { sucess: true, data: user, msg: " users doesn't exist" };
    }
    return { sucess: true, data: user, msg: "user updated sucessfully" };
  } catch (error) {
    throw (error);
  }
};




































// //to delete the existing user
exports.deleteUser = async (db,email, userid) => {
  try {
    const user = await db.collection("users").findOne({ email });

    await db
        .collection("users")
        .deleteOne({ _id: ObjectId(userid) });
    
   return { sucess: true, msg: "user deleted sucessfully"};
  
   
  } catch (error) {
    throw error;
  }
};

exports.changePassword = async (db, email, oldPassword, newPassword) => {
  try {
    if (!oldPassword || !newPassword)
      throw new Error("oldPassword and newPassword are required");

    const existUser = await db.collection("users").findOne({ email });
    // const existUser = await db.collection("users").findOne({_id: ObjectId(userid_id: ObjectId(userid)});
    if (!existUser)
      return res
        .status(400)
        .send("Given credentials doesn't exist in our database");
    //comapring pass
    if (!(await bcrypt.compare(oldPassword, existUser.password)))
      throw new Error("Old password does not match");
    //new pass cannot be similar with old one
    if (await bcrypt.compare(newPassword, existUser.password))
      throw new Error("New password cannot be old password");
    //replacing new password
    const hashPass = await bcrypt.hash(newPassword, 10);

    // await db.collection("users").updateOne({_id: ObjectId(userid)},{$set:{password: hashPass}});
    await db
      .collection("users")
      .updateOne({ email }, { $set: { password: hashPass } });
    return {
      success: true,
      message: "Password changed successfully!",
    };
  } catch (error) {
    throw error;
  }
};
