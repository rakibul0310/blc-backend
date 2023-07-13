const express = require("express");
const { verifyAuth, verifyUser } = require("../../middleware/authMiddleware");
const {
  paymentIntent,
  createTransaction,
  createMyCourse,
  getMyCourses,
  getMyCourseById,
} = require("../../controllers/secureControllers");
const router = express.Router();

const middleware = [verifyAuth, verifyUser];
router.use(middleware);

router.post("/payment-intent", paymentIntent);
router.post("/transaction", createTransaction);
router.post("/my-courses", createMyCourse);
router.get("/my-courses", getMyCourses);
router.get("/my-courses/:id", getMyCourseById);

module.exports = router;
