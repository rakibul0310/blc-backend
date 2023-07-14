const express = require("express");
const { verifyAuth, verifyAdmin } = require("../../middleware/authMiddleware");
const { createUpdate } = require("../../controllers/privateControllers");
const router = express.Router();

const middleware = [verifyAuth, verifyAdmin];
router.use(middleware);

router.post("/updates", createUpdate);

module.exports = router;
