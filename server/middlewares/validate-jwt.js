const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
   let { token } = req.cookies;

   token = req.header("x-token") || token;

   if (!token) return res.status(401).json({ ok: false, msg: "Request without token" });

   try {
      const { _id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

      req._id = _id;
      req.name = name;
   } catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
   }

   next();
};

module.exports = { validateJWT };
