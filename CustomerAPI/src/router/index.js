const express = require("express");
const router = require("express").Router();
const passwordReset = require("./passwordreset")


const userRouter = require("./users");

const authRouter = require("./auth");


router.use("/auth", authRouter)

router.use("/users", userRouter)

router.use("/password-reset", passwordReset);

module.exports = router;