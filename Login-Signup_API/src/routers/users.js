const express = require("express");
const {
    getUser, getUsers, createUser, updateUser, deleteUser
    } = require("../controllers/user.controller");
const {register} = require("../controllers/auth");
    
const router = express.Router();

router
    .route("/")
    .get(getUsers)
router
    .route("/register")
    .post(createUser);
router
    .route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports=router;
