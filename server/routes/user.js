const { Router } = require("express");
const {
   loginUser,
   registerUser,
   validateToken,
   oAuthLogin,
} = require("../controllers/user");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post("/login", loginUser);

router.post(
   "/register",
   [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Invalid email").isEmail(),
      check("password", "Password should be more than 5 characters").isLength({ min: 6 }),
      validateFields,
   ],
   registerUser
);

router.get("/renew-session", [validateJWT], validateToken);

router.post("/oauth-login", oAuthLogin);

module.exports = router;
