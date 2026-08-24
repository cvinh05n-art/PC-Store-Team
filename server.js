require("dotenv").config({
  path: ".env.local"
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ===============================
// IMPORT ROUTES
// ===============================

const authRoutes = require("./routes/auth.route");
const categoryRoutes = require("./routes/category.route");
const brandRoutes = require("./routes/brand.route");
const orderRoutes = require("./routes/order.route");

// ===============================
// CREATE APP
// ===============================

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// ===============================
// TEST SERVER
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API đang hoạt động"
  });
});

// ===============================
// API ROUTES
// ===============================

// Authentication
app.use("/api/auth", authRoutes);

// Categories
app.use("/api/categories", categoryRoutes);

// Brands
app.use("/api/brands", brandRoutes);

// Orders
app.use("/api/orders", orderRoutes);

// ===============================
// 404
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Không tìm thấy API"
  });
});

// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.error("Lỗi server:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Lỗi máy chủ"
  });
});

// ===============================
// CONFIG
// ===============================

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/product_management";

// ===============================
// CHECK ENV
// ===============================

console.log("----------------------------------");
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log(
  "MAIL_PASS length:",
  process.env.MAIL_PASS
    ? process.env.MAIL_PASS.length
    : 0
);
console.log("PORT:", PORT);
console.log("----------------------------------");

// ===============================
// CONNECT MONGODB
// ===============================

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Kết nối MongoDB thành công");

    app.listen(PORT, () => {
      console.log(
        `Server đang chạy tại http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "Kết nối MongoDB thất bại:",
      error.message
    );

    process.exit(1);
  });