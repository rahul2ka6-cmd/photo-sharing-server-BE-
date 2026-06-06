const express = require("express");
const mongoose = require("mongoose");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");

const router = express.Router();

// POST /commentsOfPhoto/:photo_id - Add comment to photo
router.post("/:photo_id", async (req, res) => {
  const { photo_id } = req.params;
  const { comment } = req.body;
  const user_id = req.user_id; // From JWT middleware

  // Validate photo_id
  if (!mongoose.Types.ObjectId.isValid(photo_id)) {
    return res.status(400).json({ error: "Invalid photo ID format" });
  }

  // Validate comment content
  if (!comment || typeof comment !== "string" || !comment.trim()) {
    return res.status(400).json({ error: "Comment text is required and cannot be empty" });
  }

  try {
    // Find the photo
    const photo = await Photo.findById(photo_id);
    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }

    // Create new comment object
    const newComment = {
      comment: comment.trim(),
      date_time: new Date(),
      user_id: user_id
    };

    // Add comment to photo
    photo.comments.push(newComment);
    await photo.save();

    // Get the newly added comment with user info populated
    const updatedPhoto = await Photo.findById(photo_id)
      .populate({ path: "comments.user_id", select: "_id first_name last_name", model: User })
      .lean();

    // Find the newly added comment
    const addedComment = updatedPhoto.comments[updatedPhoto.comments.length - 1];
    
    // Format response
    const formattedComment = {
      _id: addedComment._id,
      comment: addedComment.comment,
      date_time: addedComment.date_time,
      user: addedComment.user_id ? {
        _id: addedComment.user_id._id,
        first_name: addedComment.user_id.first_name,
        last_name: addedComment.user_id.last_name
      } : null
    };

    res.status(201).json({
      message: "Comment added successfully",
      comment: formattedComment
    });

  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Server error while adding comment" });
  }
});

module.exports = router;