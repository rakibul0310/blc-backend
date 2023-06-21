const express = require("express");
const { verifyAuth, verifyUser } = require("../../middleware/authMiddleware");
const router = express.Router();

const middleware = [verifyAuth, verifyUser];
router.use(middleware);

// router.get();

module.exports = router;
