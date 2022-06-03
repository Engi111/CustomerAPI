const express = require("express")
const router = require("express").Router();

const userRouter = require("./users");
const authRouter = require("./auth");
const passwordReset = require("../routers/passwordReset");


router.use("/users", userRouter)

router.use("/auth", authRouter)

router.use("/password-reset", passwordReset);



module.exports = router;