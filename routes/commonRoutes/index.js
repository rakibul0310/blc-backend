const express = require("express");
const { verifyAuth } = require("../../middleware/authMiddleware");
const {
  userInfo,
  updateUserInfo,
  changePassword,
  getUpdates,
} = require("../../controllers/commonControllers");
const router = express.Router();

router.use(verifyAuth);

router.get("/user", userInfo);
router.post("/user", updateUserInfo);
router.post("/change-password", changePassword);
router.get("/updates", getUpdates);

module.exports = router;
