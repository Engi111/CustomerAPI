const express = require("express");
const router = require("express").Router();

const passwordReset = require("./passwordreset");

const userRouter = require("./users");

const authRouter = require("./auth");

const adminRouter = require("./admin");

const uploadRouter = require("./uploadRouter");

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/admin", adminRouter);

router.use("/password-reset", passwordReset);

router.use("/new", uploadRouter);

module.exports = router;
