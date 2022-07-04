const { getUsers,searchUsers } = require("../controllers/admin");

const router = require("express").Router();


router.get("/details",getUsers);

router.get("/search",searchUsers);

module.exports = router;