const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.get("/list", async (request, response) => {
  try {
    const users = await User.find({}).select("_id first_name last_name");
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "ID nguoi dung khong hop le" });
  }
  try {
    const user = await User.findById(id).select(
      "_id first_name last_name location description occupation"
    );
    if (!user)
      return response.status(404).json({ message: "Khong tim thay nguoi nay" });
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: "Loi server" });
  }
});

module.exports = router;
