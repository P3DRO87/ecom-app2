const { Router } = require("express");
const {
   createOrder,
   checkOrder,
   getUserOrders,
   payOrder,
} = require("../controllers/orders");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post("/", [validateJWT], createOrder);

router.post("/check-valid-order", [validateJWT], checkOrder);

router.get("/get-user-orders", [validateJWT], getUserOrders);

router.post("/pay", [validateJWT], payOrder);

module.exports = router;
