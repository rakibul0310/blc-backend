// const jwt = require("jsonwebtoken");
const { verifyJwt } = require("../config/generateToken.js");
const User = require("../models/userModel.js");

const verifyAuth = async (req, res, next) => {
  if (typeof req.headers["authorization"] === "undefined") {
    res.status(401).send({
      message: "Not authorized, cannot find token",
    });
  } else {
    let token = req.headers["authorization"];
    let decoded = verifyJwt(token);
    if (decoded.status) {
      req.auth = decoded.data;
      next();
    } else {
      res.status(401).send({
        message: "Unauthorized access",
      });
    }
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const requester = req.auth.id;
    const requesterAccount = await User.findOne({ email: requester });
    if (requesterAccount?.role === "admin") {
      next();
    } else {
      res.status(401).send({
        message: "Not authorized, token failed",
      });
    }
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const requester = req.auth.id;
    const requesterAccount = await User.findOne({ email: requester });
    if (
      requesterAccount?.role === "student" ||
      requesterAccount?.role === "teacher"
    ) {
      next();
    } else {
      res.status(401).send({
        message: "Not authorized, token failed",
      });
    }
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
};

module.exports = { verifyAuth, verifyAdmin, verifyUser };
