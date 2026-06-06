const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AdminRouter = require("./routes/AdminRouter");
const CommentRouter = require("./routes/CommentRouter");

require("dotenv").config();

const app = express();

const JWT_SECRET = process.env.JWT_SECRET || "photo-app-jwt-secret-key";

// CORS
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    return callback(null, origin);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// Serve images
app.use("/images", express.static(path.join(__dirname, "images")));

// Connect to database
dbConnect();

// JWT Auth middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. Please login first." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user_id = decoded.user_id;
    req.first_name = decoded.first_name;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Invalid or expired token. Please login again." });
  }
}

// Public routes
app.use("/admin", AdminRouter);

app.get("/test/info", (req, res) => {
  res.json({ message: "Photo Sharing App Backend", version: "1.0.0" });
});

// Protected routes
app.use("/user", requireAuth, UserRouter);
app.use("/photosOfUser", requireAuth, PhotoRouter);
app.use("/commentsOfPhoto", requireAuth, CommentRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
