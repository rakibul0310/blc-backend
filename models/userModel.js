const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: false },
  token: String,
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  user_status: { type: Boolean, default: true }, //will be inactive when it is deleted
  gender: String,
  avatar_public_url: String,
  avatar: String,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
