const User = require("../../models/userModel");

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

module.exports = {
  userInfo,
};
