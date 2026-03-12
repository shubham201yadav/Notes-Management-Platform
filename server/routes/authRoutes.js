const express = require("express");
const router = express.Router();

const {
  sendRegistrationOtp,
  register,
  login,
  forgotPassword,
  resetPasswordWithOtp
} = require("../controllers/authController");

router.post("/send-registration-otp", sendRegistrationOtp);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPasswordWithOtp);

module.exports = router;