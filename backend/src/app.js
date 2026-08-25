const express = require("express");
const cors = require("cors");

const app = express();

const categoryRoutes = require("./routes/category.route");
const brandRoutes = require("./routes/brand.route");
const orderRoutes = require("./routes/order.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const cartRoutes = require("./routes/cart.routes");

const productRoutes = require("./routes/product.routes");

// Middleware
app.use(cors());
// Cho phép nhận JSON lớn hơn để hỗ trợ ảnh Base64
app.use(express.json({limit: "10mb"}));

// Cho phép form URL encoded lớn
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "PC Store API is running"
    });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Không tìm thấy API"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Lỗi máy chủ"
    });
});

module.exports = app;