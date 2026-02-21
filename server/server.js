const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = 5005;
app.get("/", (req, res) => {
  res.send("StudyWithStranger Backend Running 🚀");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});