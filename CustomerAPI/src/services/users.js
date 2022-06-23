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

    //save user in db
    let insertedUser = await users.insertOne({
      email,
      password: encryptedPassword,
      token,
    });

    console.log(insertedUser.insertedId.toString());
    //to create a token

    // await users.updateOne({email: {$eq : email}},{$set : {token}})
    //to send activation link
    return {
      sucess: true,
      messsge: "User registered sucessfully",
      insertedUser,
      email,
      acivationLink: `${baseURL}/api/auth/confirm/${token}/${insertedUser.insertedId.toString()}`,
    };
  } catch (error) {
    throw error;
  }
};

// tp get detail of a particular user
exports.getUser = async (db, id) => {
  try {
    return { messsge: "Get details of a user using id" };
  } catch (error) {
    throw error;
  }
};

//to get details of the users
exports.getUsers = async () => {
  try {
    return { messsge: "Get details of user" };
  } catch (error) {
    throw error;
  }
};

// to update the user's details
exports.updateUser = async () => {
  try {
    return { messsge: "Update the details of user" };
  } catch (error) {
    throw error;
  }
};

// //to delete the existing user
exports.deleteUser = async () => {
  try {
    return { messsge: "To delete the user" };
  } catch (error) {
    throw error;
  }
};
