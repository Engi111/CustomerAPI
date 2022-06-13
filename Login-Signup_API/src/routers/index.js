const express = require("express")
const router = require("express").Router();

const userRouter = require("./users");
const authRouter = require("./auth");
const passwordReset = require("../routers/passwordReset");

const imageUpload = require('../controllers/file.controller');
const {uploadFile, uploadFiles}= require("../middleware/upload");


router.use("/users", userRouter)

router.use("/auth", authRouter)

router.use("/password-reset", passwordReset);

// let routes = (app) => {
    router.post("/upload",uploadFile, imageUpload.upload);
    router.post("/upload/multiple",uploadFiles, imageUpload.uploads);
    router.get("/files", imageUpload.getListFiles);
    router.get("/files/:name", imageUpload.download);
    // app.use(router);
//   };



module.exports = router;