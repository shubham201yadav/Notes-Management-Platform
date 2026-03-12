const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    purpose: {
      type: String,
      enum: ["registration", "password_reset"],
      default: "password_reset",
    },
    expiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", otpSchema);