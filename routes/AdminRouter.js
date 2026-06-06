const express = require("express");
const User = require("../db/userModel");
const { generateToken, requireAuth } = require("../middleware/auth");

const router = express.Router();

// POST /admin/login
router.post("/login", async (req, res) => {
  const { login_name } = req.body;

  if (!login_name) {
    return res.status(400).json({ error: "login_name is required" });
  }

  try {
    const user = await User.findOne({ login_name }).lean();
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /admin/logout — cần đăng nhập mới logout được
router.post("/logout", requireAuth, (req, res) => {
  // JWT stateless — client tự xóa token
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
