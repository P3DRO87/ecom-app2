const { Router } = require("express");
const { uploadImages } = require("../controllers/uploads");

const router = Router();

router.post("/images" , uploadImages);

module.exports = router;
