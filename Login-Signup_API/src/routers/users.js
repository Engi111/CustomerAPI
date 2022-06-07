const express = require("express");
const auth = require("../middleware/authJwt");
const {
    getUser, getUsers, createUser, updateUser, deleteUser
    } = require("../controllers/user.controller");
const {register, change_password} = require("../controllers/auth");
const role = require("../middleware/role");
    
const router = express.Router();

router
    .route("/")
    .get(getUsers)
router
    .route("/register")
    .post(createUser);

router.put("/change_password",auth,change_password)

router.get("/details", auth,role("admin"),getUsers);

router
    .use(auth)
    .route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports=router;
