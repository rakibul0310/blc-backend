const { generateToken } = require("../../config/generateToken");
const Course = require("../../models/courseModel");
const User = require("../../models/userModel");

/**
 * ? Info: User Ragistration Controller
 */
const register = async (req, res) => {
  try {
    const { name, email, password, confrimPassword } = req.body;

    if (!name) {
      res.status(400).json({
        message: "Name is required",
      });
    } else if (!email) {
      res.status(400).json({
        message: "Email is required",
      });
    } else if (!password) {
      res.status(400).json({
        message: "Password is required",
      });
    } else if (!confrimPassword) {
      res.status(400).json({
        message: "Confrim password is required",
      });
    } else {
      // rest of the code here
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(400).json({
          message: "Already have an account with this email",
        });
      } else {
        const user = await User.create({
          name,
          email,
          password,
          token: generateToken(email),
        });

        if (user) {
          res.status(200).json({
            message: "Account created successfully",
          });
        } else {
          res.status(400).json({
            message: "Cann't create account.",
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.toString() });
  }
};

/**
 *? Info: User Login Controller
 */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({
        message: "Email is require",
      });
    } else if (!password) {
      res.status(400).json({
        message: "Password is require",
      });
    } else {
      // rest of the code here
      const user = await User.findOne({ email });
      if (user) {
        if (user && (await user.matchPassword(password))) {
          const updatedUser = await User.findOneAndUpdate(
            { email },
            {
              $set: {
                token: generateToken(email),
              },
            }
          );
          res.status(200).json({ user: updatedUser });
        } else {
          res.status(400).json({
            message: "Invalid password",
          });
        }
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({ courses });
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ _id: id });
    res.json({ course });
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  login,
  register,
  getAllCourses,
  getCourseById,
};
