const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* JOIN ROOM */

router.post("/join", async (req, res) => {

  try {

    const { userId, roomId } = req.body;

    if (!userId || !roomId) {
      return res.status(400).json({
        message: "userId and roomId required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.currentRoom = roomId;

    await user.save();

    res.json({
      message: "User joined room",
      roomId
    });

  } catch (error) {

    console.error("JOIN ROOM ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;