const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    purpose: { type: String, required: true },
    question: { type: String, required: true },
    image: String,
    date: { type: String, default: new Date().toDateString() },
  },
  { timestamps: true }
);

const SupportTicket = new mongoose.model("SupportTicket", supportTicketSchema);

module.exports = SupportTicket;
