const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: { type: String, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: false },
  mobile: { type: String, required: true },
  sponsor_id: { type: String, required: true, default: "tlc001" },
  sponsor_name: { type: String, required: true, default: "Admin" },
  token: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  verified: { type: Boolean, default: false },
  topup_status: { type: Boolean, default: false },
  user_status: { type: Boolean, default: true }, //will be inactive when it is deleted
  topup_activation_date: { type: String },
  activation_date: String,
  gifted_date: String,
  trx_password: String,
  country: String,
  gender: String,
  avatar_public_url: String,
  avatar: String,
  wallet_address: String,
  active_package: String,
  team: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Level",
    },
  ],
  join_date: { type: String },
  first_idx: { type: Number, default: -1 },
  second_idx: { type: Number, default: -1 },
  third_idx: { type: Number, default: -1 },
  fourth_idx: { type: Number, default: -1 },
  fifth_idx: { type: Number, default: -1 },
  VI_idx: { type: Number, default: -1 },
  VII_idx: { type: Number, default: -1 },
  VIII_idx: { type: Number, default: -1 },
  IX_idx: { type: Number, default: -1 },
  X_idx: { type: Number, default: -1 },
  XI_idx: { type: Number, default: -1 },
  XII_idx: { type: Number, default: -1 },
  XIII_idx: { type: Number, default: -1 },
  XIV_idx: { type: Number, default: -1 },
  XV_idx: { type: Number, default: -1 },
  XVI_idx: { type: Number, default: -1 },
  boost_idx: { type: Number, default: -1 },
  active: { type: Boolean, default: true }, //will be inactive when it is deleted,
  income_Types: { type: String },
  position: { type: String },
  current_autopool: { type: Number, default: 0 },
  delete_status: { type: Boolean, default: false },
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
