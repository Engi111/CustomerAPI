const express = require("express");
const Joi = require("joi");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

//for reseting password
router.post("/", async(req, res) => { 
    const users = req.db.collection("users");
    // const Token = req.db.collection("token");
    // const email = req.db.collection("email");

    try {
        const schema = Joi.object({email: Joi.string().email().required()});
        const {error} = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await users.findOne({email : req.body.email});
        if (!user)
            return res.status(400).send("Given credentials doesn't exist in our database");
        
        /* 
            Generate TOKEN
        */
        let tokenDoc = await req.db.collection("token").findOne({email: req.body.email});
        let token =null;
        if (!tokenDoc) {

            token = jsonwebtoken.sign({email: req.body.email},process.env.SECRET);
            await req.db.collection('token').insertOne({email: req.body.email, token, userId: user._id})
            console.log(`hello ${token}`); 

            // update token

            // const token = await new Token({
            //         email,
            //         token: crypto.randomBytes(32).toString("hex"),
            //     })
            //token.save();
        } else {
            token = tokenDoc.token;
        }
  
        const link = `${process.env.BASE_URL}/api/password-reset/${user._id}/${token}`;
       return res.json({
            resetlink : link
        });
    } catch (error) {
        res.send("Error occured during the process");
        console.log(error);
    }
});


router.post("/:userId/:token", async (req,res) => {
    try {
        // validate user input
        const schema = Joi.object({password: Joi.string().required()});
        const {error} = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        // find if user with userID exist -> got from req params
        const user = await req.db.collection("users").findOne({_id: ObjectId(req.params.userId)});
        if (!user) return res.status(400).send("link invalid or expired");
        
        // check if token exist for user with userID -> taken from req params 
        const token = await req.db.collection("token").findOne({    
            // userId: ObjectId(req.params.userId),
            token: req.params.token
        });

        if(!token) return res.status(400).send("Invalid link or expired");

        // hash new password and update user passwod 
        
        let hashPass = await bcrypt.hash(req.body.password, 10);

        const updatedValue = await req.db.collection("users").updateOne({
            _id: ObjectId(req.params.userId)},
            {  
                $set:{
                    password: hashPass
                }
            });

        // after updating password delete the token
        await req.db.collection("token").deleteOne({token});
    
        res.send("Password reset sucessfully");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }    
});


module.exports = router;

