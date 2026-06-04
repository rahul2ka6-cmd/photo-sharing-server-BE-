const express = require("express");
const mongoose = require("mongoose");
const User = require("../db/userModel");

const router = express.Router();

// GET /user/list
router.get("/list", async (req, res) => {
  try {
    const users = await User.find({}).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /user/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }

  try {
    const user = await User.findById(id).lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
