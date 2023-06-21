const express = require("express");
const { verifyAuth } = require("../../middleware/authMiddleware");
const { userInfo } = require("../../controllers/commonControllers");
const router = express.Router();

router.use(verifyAuth);

router.get("/user", userInfo);

module.exports = router;
