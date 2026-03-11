const express = require("express");
const router = express.Router();
const Violation = require("../models/Violation");

router.post("/", async (req,res)=>{

  const violation = await Violation.create(req.body);

  res.json(violation);

});

module.exports = router;