const router = require("express").Router();
const authControllers = require("../controllers/auth")

router.post("/confirm/:token/:userid", authControllers.activation);

module.exports=router;