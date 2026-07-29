const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const categoryRoutes = require("./routes/category.route");
const brandRoutes = require("./routes/brand.route");
const orderRoutes = require("./routes/order.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test API
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