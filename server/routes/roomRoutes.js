router.post("/join", async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.currentRoom = roomId;
    await user.save();

    res.json({ message: "Joined room successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:roomId/users", async (req, res) => {
  try {
    const users = await User.find({
      currentRoom: req.params.roomId
    }).select("firstName lastName primaryCategory");

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});