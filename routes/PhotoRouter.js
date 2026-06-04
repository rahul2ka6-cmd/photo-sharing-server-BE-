const express = require("express");
const mongoose = require("mongoose");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");

const router = express.Router();

// GET /photosOfUser/:id
router.get("/photosOfUser/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }

  try {
    const photos = await Photo.find({ user_id: id })
      .select("_id user_id file_name date_time comments")
      .populate({ path: "comments.user_id", select: "_id first_name last_name", model: User })
      .lean();

    // Format lại comments: đổi user_id thành user
    const result = photos.map((photo) => ({
      ...photo,
      comments: (photo.comments || []).map((c) => ({
        _id: c._id,
        comment: c.comment,
        date_time: c.date_time,
        user: c.user_id || null,
      })),
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
