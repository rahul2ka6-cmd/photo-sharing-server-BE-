const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {});

router.get("/list", async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) return res.status(400).json({ error: "User not found" });
    response.json(user);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = router;
