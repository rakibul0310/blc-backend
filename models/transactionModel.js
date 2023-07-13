const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  transaction_id: { type: String, required: true },
  status: { type: Boolean, required: true },
  date: { type: String, default: new Date() },
});

const Transaction = new mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
