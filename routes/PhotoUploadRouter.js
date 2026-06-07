const express = require("express");
const multer = require("multer");
const path = require("path");
const Photo = require("../db/photoModel");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// POST /photos/new - Upload a photo for the current user
router.post(
  "/new",
  upload.single("photo"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file in the POST request" });
    }

    try {
      const newPhoto = new Photo({
        file_name: req.file.filename,
        date_time: new Date(),
        user_id: req.user_id,
        comments: [],
      });

      await newPhoto.save();

      res.status(201).json({
        message: "Photo uploaded successfully",
        photo: {
          _id: newPhoto._id,
          file_name: newPhoto.file_name,
          date_time: newPhoto.date_time,
          user_id: newPhoto.user_id,
          comments: [],
        },
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ error: "Server error while uploading photo" });
    }
  },
  (error, req, res, next) => {
    // Handle multer errors
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ error: error.message });
    }
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  }
);

module.exports = router;
