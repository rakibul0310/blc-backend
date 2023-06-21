const express = require("express");
const { verifyAuth, verifyAdmin } = require("../../middleware/authMiddleware");
const router = express.Router();

const middleware = [verifyAuth, verifyAdmin];
router.use(middleware);

// router.get();

module.exports = router;
