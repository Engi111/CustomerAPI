// const { Router } = require("express");
const express = require("express");
const { createUser, getUser, getUsers, updateUser, deleteUser } = require("../controllers/users");
const router = express.Router();
const authorize = require("../helpers/authorizationRole");
const auth = require("../helpers/authjwt");
const { changePassword } = require("../controllers/users");


// const controllers = require("../controllers")
router.post("/register", createUser);

router.get("/",auth,authorize("user"),getUsers); //authorization

// router.get("/:id", getUser);

// router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.put("/change-password",auth, changePassword);

module.exports=router;