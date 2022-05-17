//creating a route
const router = require("express").Router();
// package to verify and validate user's info also to encrypt the password
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
//importing jwt for login route
const jwt = require("jsonwebtoken");
//importing to use the model
const User = require("../models/userModel.js");
const req = require("express/lib/request");
const res = require("express/lib/response");


router.get('/',(req,res,next)=>{
    res.status(200).send('hello')
})

//for register route
router.post("/register", async (req,res) =>{
//now its time for creating a user instance
// this helps to check the errors
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
//this is to check if the user is already in the database
    const emailExists = await User.findOne({
        email: req.body.email
    });
    if (emailExists) return res.status(400).send("Email already exists");
//now this sollowing step helps to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);    
//after checking the error and existing user the new user is created
//and stored in the database by using:
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});
//for login route
router.post("/login", async (req,res) =>{
//for checking errors and existing users
const { error } = loginSchema.validate(req.body);
if (error) return res.status(400).send(error.details[0].message);

const user = await User.findOne({ email: req.body.email });

if (!user) return res.status(400).send("Email or password is wrong");
//to check if the password is wrong for the login
const validPass = await bcrypt.compare(req.body.password, user.password);

if (!validPass) return res.status(400).send("Email or password is wrong");
//now its time to create a JWT token and send it to the browser
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
res.header("auth-token", token).send(token);
});
// now its time to validate the data for that we're using joiiiiiiii
const registerSchema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(8).required(),
});


const loginSchema = Joi.object({
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(8).required(),
});

module.exports = router;