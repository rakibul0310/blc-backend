const express = require("express");
const { verifyAuth, verifyUser } = require("../../middleware/authMiddleware");
const { paymentIntent } = require("../../controllers/secureControllers");
const router = express.Router();

const middleware = [verifyAuth, verifyUser];
router.use(middleware);

router.post("/payment-intent", paymentIntent);

module.exports = router;
