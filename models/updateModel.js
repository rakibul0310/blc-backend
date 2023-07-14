const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: { type: String, default: new Date().toDateString() },
  },
  { timestamps: true }
);

const Update = new mongoose.model("Update", updateSchema);

module.exports = Update;
