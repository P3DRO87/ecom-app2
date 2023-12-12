const { Router } = require("express");
const {
   getProducts,
   getProductBySlug,
   updateProduct,
   createProduct,
} = require("../controllers/products");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", getProducts);

router.get("/:slug", getProductBySlug);

router.post("/create", createProduct);

router.put("/update/:id", updateProduct);

module.exports = router;
