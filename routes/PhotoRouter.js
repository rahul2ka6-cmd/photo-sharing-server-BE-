const express = require("express");
const mongoose = require("mongoose"); // Bổ sung thư viện Mongoose
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

async function getUserMap(userIds) {
  const users = await User.find({ _id: { $in: userIds } })
    .select("_id first_name last_name")
    .lean();

  const map = {};
  users.forEach((u) => {
    map[u._id.toString()] = u;
  });

  return map;
}

const UNKNOWN_USER = { _id: null, first_name: "Unknown", last_name: "" };

router.get("/:id", async (request, response) => {
  const { id: userId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return response.status(400).json({ message: "ID nguoi dung khong hop le" });
  }

  try {
    const photo = await Photo.find({ user_id: userId })
      .select("_id user_id file_name date_time comments likes")
      .lean();

    if (!photo.length) return response.status(200).json([]);

    const commentUserIds = new Set();

    photo.forEach((photo) => {
      (photo.comments || []).forEach((c) => {
        if (c.user_id) commentUserIds.add(c.user_id.toString());
      });
    });

    const userMap = await getUserMap([...commentUserIds]);

    const formattedPhotos = photo.map((photo) => ({
      ...photo,
      likes: photo.likes || [],
      comment: (photo.comment || []).map((comment) => ({
        _id: comment._id,
        comment: comment.comment,
        date_time: comment.date_time,
        user: userMap[comment.user_id?.toString()] || UNKNOWN_USER,
      })),
    }));
    response.status(200).json(formattedPhotos);
  } catch (error) {
    console.error("Loi khi tai danh sach anh", error);
    response.status(500).json({ message: "loi server" });
  }
});
module.exports = router;
