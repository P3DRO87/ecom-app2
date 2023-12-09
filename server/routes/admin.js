const { Router } = require("express");
const { getAdminInfo } = require("../controllers/admin");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getUsers, updateUser } = require("../controllers/user");

const router = Router();

router.get("/dashboard", [validateJWT], getAdminInfo);

router.get("/users", [validateJWT], getUsers);

router.post("/update-user", [validateJWT], updateUser);

module.exports = router;
