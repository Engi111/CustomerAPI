const sendEmail = require("../utils/sendEmail");
const express = require("express");
const Token = require("../models/token");
const {User} = require("../models/user.model");
const Joi = require("joi");
const crypto = require("crypto");
const { status } = require("express/lib/response");
const router = express.Router();

//for reseting password
router.post("/", async(req, res) => {
    try {
        const schema = Joi.object({email: Joi.string().email().required()});
        const {error} = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({email: req.body.email});
        if (!user)
            return res.status(400).send("Given credentials doesn't exist in our database");
        
        let token = await Token.findOne({userId: user._id});

        if (!token) {
            token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                })
            token.save();
        }    
        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        let value = await sendEmail({to: user.email, subject: "Password Reset", content:`<p>${link}</p>`});
        if(value?.error) console.log(value.error)
        res.json({
            resetlink : link
        });
    } catch (error) {
        res.send("Error occured during the process");
        console.log(error);
    }
});


router.post("/:userId/:token", async (req,res) => {
    try {
        const schema = Joi.object({password: Joi.string().required()});
        const {error} = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("link invalid or expired");
        
        const token = await Token.findOne({    
            userId: user._id,
            token: req.params.token,
        });

        if(!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();
        
        res.send("Password reset sucessfully");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }    
})


module.exports = router;
