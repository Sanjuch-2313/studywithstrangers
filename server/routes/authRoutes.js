const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// ================= EMAIL SETUP =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate 6 digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ================== SIGNUP ==================
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    // If already registered & verified
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    // If exists but NOT verified → resend OTP
    if (existingUser && !existingUser.isVerified) {
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpiry;
      await existingUser.save();

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email - StudyWithStrangers",
        html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes.</p>`
      });

      return res.json({
        message: "OTP resent to your email",
        email: email
      });
    }

    // New User
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp: otp,
      otpExpires: otpExpiry,
      isVerified: false
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email - StudyWithStrangers",
      html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes.</p>`
    });

    res.status(201).json({
      message: "OTP sent to your email",
      userId: user._id,
      email: email
    });

  } catch (error) {
    console.log("Signup Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ================== LOGIN ==================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email before logging in"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      userId: user._id,
      planType: user.planType,
      isSurveyCompleted: user.isSurveyCompleted,
      primaryCategory: user.primaryCategory,
      dailyTargetHours: user.dailyTargetHours,
      goal: user.goal
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================== VERIFY OTP ==================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (error) {
  console.log("🔥 SIGNUP ERROR:", error);
  res.status(500).json({ message: error.message });
}
});

// ================== COMPLETE SURVEY ==================
router.put("/complete-survey/:id", async (req, res) => {
  try {
    const { primaryCategory, dailyTargetHours, goal } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        primaryCategory,
        dailyTargetHours,
        goal,
        isSurveyCompleted: true,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Survey completed successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;