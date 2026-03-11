const mongoose = require("mongoose");

const violationSchema = new mongoose.Schema({

  userId: String,
  type: String,
  time: Date

});

module.exports = mongoose.model("Violation", violationSchema);