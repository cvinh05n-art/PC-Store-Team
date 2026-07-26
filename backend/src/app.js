const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "PC Store API is running"
    });
});

module.exports = app;