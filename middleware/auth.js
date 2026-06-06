const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "photo-app-secret";

// Tạo token cho user sau khi login
function generateToken(user) {
  return jwt.sign({ _id: user._id, login_name: user.login_name }, JWT_SECRET, {
    expiresIn: "24h",
  });
}

// Middleware kiểm tra token — dùng cho các route cần đăng nhập
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { generateToken, requireAuth };
