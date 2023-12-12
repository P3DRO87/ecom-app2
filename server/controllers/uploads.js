const { response } = require("express");

 const uploadImages  = (req, res = response) => {
   res.json({ msg: "upload file" });
};

module.exports = {uploadImages}
