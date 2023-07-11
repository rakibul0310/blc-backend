const MyCourse = require("../../models/myCourseModel");
const Transaction = require("../../models/transactionModel");

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

module.exports = {
  paymentIntent,
  createTransaction,
  createMyCourse,
};
