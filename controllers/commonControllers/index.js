const Update = require("../../models/updateModel");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const userInfo = async (req, res) => {
  try {
    let email = req.auth.id;

    const user = await User.findOne({ email }).select(["-password"]);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({
        message: "Authentication error",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.auth;
    const updatedUserInfo = await User.findOneAndUpdate(
      { email: id },
      {
        $set: { ...data },
      }
    );
    res.json(updatedUserInfo);
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// change password
const changePassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    const id = req.auth.id;
    if (!new_password) {
      res.status(400).json({
        message: "New password is missing",
      });
    }
    if (!current_password) {
      res.status(400).json({
        message: "Current password is missing",
      });
    }
    // find user
    const user = await User.findOne({ email: id });
    if (user && (await user.matchPassword(current_password))) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(new_password, salt);
      const changePassword = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      await changePassword.save();
      res.status(200).json({
        message: "Password change successfully",
      });
    } else {
      res.status(400).json({
        message: "Invalid Current Password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const getUpdates = async (req, res) => {
  try {
    const updates = await Update.find({});
    res.json(updates);
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  userInfo,
  updateUserInfo,
  changePassword,
  getUpdates,
};
