const jwt = require("jsonwebtoken");

const generateJWT = (payload = {}) => {
   return new Promise((resolve, reject) => {
      jwt.sign(
         payload,
         process.env.SECRET_JWT_SEED,
         {
            expiresIn: "365d",
         },
         (err, token) => {
            if (err) {
               console.log(err);
               reject("The token couldn't be generated");
            } else resolve(token);
         }
      );
   });
};

module.exports = { generateJWT };
