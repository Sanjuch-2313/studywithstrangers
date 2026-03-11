const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    primaryCategory: {
      type: String,
      enum: ["JEE", "NEET", "UPSC", "GATE", "CODING", "STARTUP"],
      default: null,
    },

    planType: {
      type: String,
      enum: ["free", "serious", "pro"],
      default: "free",
    },

    isSurveyCompleted: {
      type: Boolean,
      default: false,
    },

    otp: String,

    otpExpires: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    /* IMPORTANT — must be inside schema */
    currentRoom: {
      type: String,
      default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);