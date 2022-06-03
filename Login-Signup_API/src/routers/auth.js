const express = require("express");
const {login, logout} = require("../controllers/auth");
const {user, validate} = require("../models/user.model");
const Joi = require("joi");
const jsonwebtoken = require("jsonwebtoken");
const { TokenExpiredError } = require("jsonwebtoken");
crypto = require("crypto");
const router = express.Router();


router
    .route("/login")
    .post(login);

    //for validation saving user
router.post("/", async(req, res) =>{
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await new User(req.body).save();

        res.send(user);
    } catch (error) {
        res.send("An error occur while validating")
        console.log(error);
    }
});



module.exports=router;