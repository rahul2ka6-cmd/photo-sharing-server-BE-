const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../db/userModel");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "photo-app-jwt-secret-key";

// POST /admin/login
// Body: { login_name: "ian" }
router.post("/login", async (req, res) => {
  const body = req.body || {};
  const login_name = body.login_name;

  if (!login_name || typeof login_name !== "string" || !login_name.trim()) {
    return res.status(400).json({ error: "login_name is required" });
  }

  try {
    const user = await User.findOne({ login_name: login_name.trim() }).lean();

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid login name. No user found with that name." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user._id, first_name: user.first_name },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
    });
  } catch (err) {
    console.error("[AdminRouter] Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// POST /admin/logout
// With JWT, logout is handled client-side by deleting the token.
// This endpoint exists for API completeness.
router.post("/logout", (req, res) => {
  // JWT is stateless - client deletes token on their side
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
