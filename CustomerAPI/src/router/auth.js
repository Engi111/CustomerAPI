const router = require("express").Router();
const authControllers = require("../controllers/auth");
const validateUserLogin = require("../helpers/validation/auth");
const { getUsers } = require("../services/users");
const auth = require("../helpers/authjwt");
const {logout} = require("../controllers/auth");


router.post("/confirm/:token/:userid", authControllers.linkActivation);

router.post("/login", authControllers.login);

router.post("/logout", auth, authControllers.logout);

router.get("/details", auth ,getUsers);



module.exports=router;

