const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();


// ================== SIGNUP ==================
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });

  } catch (error) {
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