const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// Create Room
router.post("/create", async (req, res) => {
  try {
    const { roomName, examType } = req.body;

    const newRoom = await Room.create({
      roomName,
      examType,
    });

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;