const router = require("express").Router();
const authControllers = require("../controllers/auth");
const validateUserLogin = require("../helpers/validation/auth")

router.post("/confirm/:token/:userid", authControllers.activation);

router.post("/login", authControllers.login);

module.exports=router;