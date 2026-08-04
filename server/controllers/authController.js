const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");
const generateOTP = require("../utils/generateOTP");

const sendWelcomeEmail = async ({ name, email }) => {
  const appName = process.env.APP_NAME || "Notes Manage Platform";
  const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL;

  const welcomeHtml = `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <tr>
          <td style="background: linear-gradient(90deg, #f59e0b, #f97316); padding: 18px 24px; color: #ffffff; font-size: 18px; font-weight: 700;">
            ${appName}
          </td>
        </tr>
        <tr>
          <td style="padding: 24px;">
            <h2 style="margin: 0 0 12px; font-size: 22px; color: #111827;">Welcome to ${appName}, ${name}!</h2>
            <p style="margin: 0 0 14px; font-size: 14px; line-height: 1.6; color: #334155;">
              Your account has been created successfully. You can now log in and start exploring courses, notes, and your dashboard.
            </p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155;">
              If you need any help, just contact our support team.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 14px 24px; border-top: 1px solid #e2e8f0; background: #f8fafc; font-size: 12px; color: #64748b;">
            Need help? Contact us at <a href="mailto:${supportEmail}" style="color: #c2410c; text-decoration: none;">${supportEmail}</a>
          </td>
        </tr>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: `Welcome to ${appName}`,
    text: `Hi ${name}, welcome to ${appName}. Your account is ready.`,
    html: welcomeHtml,
  });
};

const sendRegistrationOtpEmail = async ({ email, otpCode }) => {
  const appName = process.env.APP_NAME || "Notes Manage Platform";
  const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL;

  const registrationOtpHtml = `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <tr>
          <td style="background: linear-gradient(90deg, #f59e0b, #f97316); padding: 18px 24px; color: #ffffff; font-size: 18px; font-weight: 700;">
            ${appName}
          </td>
        </tr>
        <tr>
          <td style="padding: 24px;">
            <h2 style="margin: 0 0 12px; font-size: 22px; color: #111827;">Verify Your Email</h2>
            <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: #334155;">
              Use the verification code below to complete your registration.
            </p>
            <div style="margin: 18px 0; padding: 14px; border: 1px dashed #f59e0b; border-radius: 10px; background: #fffbeb; text-align: center;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #92400e; letter-spacing: 0.08em; text-transform: uppercase;">Verification Code</p>
              <p style="margin: 0; font-size: 30px; font-weight: 800; letter-spacing: 0.2em; color: #b45309;">${otpCode}</p>
            </div>
            <p style="margin: 0 0 10px; font-size: 14px; color: #334155;">
              This code is valid for <strong>10 minutes</strong>.
            </p>
            <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.6;">
              If you did not start this registration, you can ignore this email.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 14px 24px; border-top: 1px solid #e2e8f0; background: #f8fafc; font-size: 12px; color: #64748b;">
            Need help? Contact us at <a href="mailto:${supportEmail}" style="color: #c2410c; text-decoration: none;">${supportEmail}</a>
          </td>
        </tr>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: `${appName} Email Verification Code`,
    text: `Your ${appName} verification code is ${otpCode}. It expires in 10 minutes.`,
    html: registrationOtpHtml,
  });
};

// ================= SEND REGISTRATION OTP =================
exports.sendRegistrationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await Otp.deleteMany({ email: normalizedEmail, purpose: "registration" });

    const otpCode = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await Otp.create({
      email: normalizedEmail,
      otp: otpCode,
      purpose: "registration",
      expiresAt,
    });

    await sendRegistrationOtpEmail({ email: normalizedEmail, otpCode });

    return res.json({ message: "Verification code sent to email" });
  } catch (err) {
    console.error("SEND REGISTRATION OTP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, verificationCode } = req.body;

    if (!name || !email || !password || !verificationCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
      otp: verificationCode,
      purpose: "registration",
      expiresAt: { $gt: Date.now() },
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    await Otp.deleteMany({ email: normalizedEmail, purpose: "registration" });

    try {
      await sendWelcomeEmail({ name: newUser.name, email: newUser.email });
    } catch (mailErr) {
      console.error("WELCOME EMAIL ERROR:", mailErr);
    }

    res.status(201).json({
      message: "User Registered Successfully",
      userId: newUser._id,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing in .env");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= FORGOT PASSWORD (OTP) =================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Otp.deleteMany({ email: normalizedEmail, purpose: "password_reset" });

    const otpCode = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await Otp.create({
      email: normalizedEmail,
      otp: otpCode,
      purpose: "password_reset",
      expiresAt,
    });

    const appName = process.env.APP_NAME || "Notes Manage Platform";
    const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL;
    const resetEmailHtml = `
      <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px; color: #0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(90deg, #f59e0b, #f97316); padding: 18px 24px; color: #ffffff; font-size: 18px; font-weight: 700;">
              ${appName}
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <h2 style="margin: 0 0 12px; font-size: 22px; color: #111827;">Reset Your Password</h2>
              <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: #334155;">
                We received a request to reset your password. Use the OTP below to continue.
              </p>

              <div style="margin: 18px 0; padding: 14px; border: 1px dashed #f59e0b; border-radius: 10px; background: #fffbeb; text-align: center;">
                <p style="margin: 0 0 6px; font-size: 12px; color: #92400e; letter-spacing: 0.08em; text-transform: uppercase;">Your One-Time Password</p>
                <p style="margin: 0; font-size: 30px; font-weight: 800; letter-spacing: 0.2em; color: #b45309;">${otpCode}</p>
              </div>

              <p style="margin: 0 0 10px; font-size: 14px; color: #334155;">
                This OTP is valid for <strong>10 minutes</strong>.
              </p>
              <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.6;">
                If you did not request this, please ignore this email. Your account remains secure.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 14px 24px; border-top: 1px solid #e2e8f0; background: #f8fafc; font-size: 12px; color: #64748b;">
              Need help? Contact us at <a href="mailto:${supportEmail}" style="color: #c2410c; text-decoration: none;">${supportEmail}</a>
            </td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: normalizedEmail,
      subject: `${appName} Password Reset OTP`,
      text: `Your ${appName} password reset OTP is ${otpCode}. It expires in 10 minutes. If you did not request this, ignore this email.`,
      html: resetEmailHtml,
    });

    res.json({ message: "OTP sent to email" });

  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= RESET PASSWORD WITH OTP =================
exports.resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase();

    const record = await Otp.findOne({
      email: normalizedEmail,
      otp,
      purpose: "password_reset",
      expiresAt: { $gt: Date.now() }
    });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    await Otp.deleteMany({ email: normalizedEmail, purpose: "password_reset" });

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};