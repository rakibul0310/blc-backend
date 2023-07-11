const express = require("express");
const {
  login,
  register,
  getAllCourses,
  getCourseById,
} = require("../../controllers/publicControllers");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/courses", getAllCourses);
router.get("/course/:id", getCourseById);

module.exports = router;
