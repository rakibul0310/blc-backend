const express = require("express");
const { verifyAuth, verifyUser } = require("../../middleware/authMiddleware");
const {
  paymentIntent,
  createTransaction,
  createMyCourse,
} = require("../../controllers/secureControllers");
const router = express.Router();

const middleware = [verifyAuth, verifyUser];
router.use(middleware);

router.post("/payment-intent", paymentIntent);
router.post("/transaction", createTransaction);
router.post("/my-courses", createMyCourse);

module.exports = router;
