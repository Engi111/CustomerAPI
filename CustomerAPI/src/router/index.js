const express = require("express");
const router = require("express").Router();
const passwordReset = require("./passwordreset")


const userRouter = require("./users");

const authRouter = require("./auth");

const adminRouter = require("./admin");

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/admin", adminRouter);

router.use("/password-reset", passwordReset);

module.exports = router;