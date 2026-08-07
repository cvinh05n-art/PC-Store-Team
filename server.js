require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const categoryRoutes = require("./routes/category.route");
const brandRoutes = require("./routes/brand.route");
const orderRoutes = require("./routes/order.route");

const app = express();

// Middleware chung
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API kiểm tra server
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API đang hoạt động"
  });
});

// Đăng ký routes
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/orders", orderRoutes);

// Xử lý đường dẫn API không tồn tại
// Phải đặt sau tất cả routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Không tìm thấy API"
  });
});

// Middleware xử lý lỗi chung
// Phải đặt cuối cùng
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Lỗi máy chủ"
  });
});

// Cấu hình
const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/product_management";

// Kết nối MongoDB rồi chạy server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Kết nối MongoDB thành công");

    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Kết nối MongoDB thất bại:", error.message);
    process.exit(1);
  });