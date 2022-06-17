// const { Router } = require("express");
const express = require("express");
const { createUser, getUser, getUsers, updateUser, deleteUser } = require("../controllers/users");
const router = express.Router();

// const controllers = require("../controllers")
router.post("/register", createUser);

router.get("/:id", getUser);

router.get("/", getUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser)


module.exports=router;