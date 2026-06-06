const express = require("express");
const cors = require("cors");
const path = require("path");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AdminRouter = require("./routes/AdminRouter");
const SchemaInfo = require("./db/schemaInfo");
const { requireAuth } = require("./middleware/auth");

const app = express();

dbConnect();

app.use(cors());
app.use(express.json());

// Serve ảnh tĩnh
app.use("/images", express.static(path.join(__dirname, "images")));

// Route không cần auth
app.use("/admin", AdminRouter);

// Route cần auth — dùng requireAuth middleware
app.get("/test/info", requireAuth, async (req, res) => {
  try {
    const info = await SchemaInfo.findOne({});
    if (!info) return res.status(404).json({ error: "SchemaInfo not found" });
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/user", requireAuth, UserRouter);
app.use("/", requireAuth, PhotoRouter);

app.listen(process.env.PORT || 8081, () => {
  console.log(`Server chạy tại port ${process.env.PORT || 8081}`);
});
