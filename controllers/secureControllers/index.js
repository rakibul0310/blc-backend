const MyCourse = require("../../models/myCourseModel");
const SupportTicket = require("../../models/supportTicketModel");
const Transaction = require("../../models/transactionModel");
const User = require("../../models/userModel");
const Cloudinary = require("../../config/cloudinary.js");

const stripe = require("stripe")(
  "sk_test_51L43RjDIsxhoLpzhcuQQuFKF3oJ4gkZGgMlVPwjQvfWKeorzEza7MKZFGCqVLSWNoH5q6MMDkble6nVheJk59zEb00PSqvHAjZ"
);

const paymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    const amount = price * 100;
    const intent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    if (intent) {
      res.status(200).json({
        clientSecret: intent.client_secret,
      });
    } else {
      res.status(400).json({
        message: "Something wrong",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const data = req.body;
    const transaction = await Transaction.create({ ...data });
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(400).json({ message: "Something wrong" });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const createMyCourse = async (req, res) => {
  try {
    const data = req.body;
    const newCourse = await MyCourse.create({ ...data });
    if (newCourse) {
      res.status(200).json(newCourse);
    } else {
      res.status(400).json({ message: "Something wrong" });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const { id } = req.auth;
    const myCourses = await MyCourse.find({ email: id });
    res.json(myCourses);
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const getMyCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const myCourses = await MyCourse.findOne({ _id: id });
    res.json(myCourses);
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const getTransactionHistory = async (req, res) => {
  const { id } = req.auth;
  try {
    const transaction = await Transaction.find({ email: id });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// Support ticket
const createSupportTicket = async (req, res) => {
  try {
    const { purpose, question } = req.body;
    const id = req.auth.id;

    if (!req.body)
      return res.status(400).json({
        message: "Please provide data",
      });
    if (!id)
      return res.status(400).json({
        message: "User Id is missing",
      });
    if (!purpose)
      return res.status(400).json({
        message: "Purpose is missing",
      });
    if (!question)
      return res.status(400).json({
        message: "Question is missing",
      });

    // find user
    const user = await User.findOne({ email: id });
    let avatar = {};

    // upload the image
    if (req.file?.path) {
      const image = await Cloudinary.uploader.upload(req.file?.path);
      avatar = {
        avatar: image.secure_url,
        avatar_public_url: image.public_id,
      };
    }

    if (user) {
      const newSupportTicket = await SupportTicket.create({
        email: user.email,
        purpose,
        image: avatar ? avatar.avatar : "",
        question,
      });
      if (newSupportTicket) {
        res.status(200).json({
          message: "Support ticket created successfully",
        });
      } else {
        res.status(400).json({
          message: "Cannot create support ticket",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid user credentials",
      });
    }
  } catch (error) {
    //console.log(error)
    res.status(500).json({
      message: error.toString(),
    });
  }
};

// get support history
const getSupportHistory = async (req, res) => {
  try {
    // const userId = req.params.user_id;
    const id = req.auth.id;
    if (id) {
      const supportTicket = await SupportTicket.find({
        email: id,
      });
      if (supportTicket) {
        res.status(200).json(supportTicket);
      } else {
        res.status(400).json({
          message: "Cannot find support ticket",
        });
      }
    } else {
      res.status(400).json({
        message: "Cannot find user credentials",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  paymentIntent,
  createTransaction,
  createMyCourse,
  getMyCourses,
  getMyCourseById,
  getTransactionHistory,
  createSupportTicket,
  getSupportHistory,
};
