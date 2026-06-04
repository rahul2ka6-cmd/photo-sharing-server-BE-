const express = require("express");
const cors = require("cors");
const path = require("path");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const SchemaInfo = require("./db/schemaInfo");

const app = express();

dbConnect();

app.use(cors());
app.use(express.json());

// Serve ảnh tĩnh
app.use("/images", express.static(path.join(__dirname, "images")));

// API theo đúng yêu cầu đề bài:
// GET /test/info
app.get("/test/info", async (req, res) => {
  try {
    const info = await SchemaInfo.findOne({});
    if (!info) return res.status(404).json({ error: "SchemaInfo not found" });
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /user/list và GET /user/:id
app.use("/user", UserRouter);

// GET /photosOfUser/:id
app.use("/", PhotoRouter);

app.listen(process.env.PORT || 8081, () => {
  console.log(`Server chạy tại port ${process.env.PORT || 8081}`);
});
