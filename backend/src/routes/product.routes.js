const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// Lấy tất cả sản phẩm
router.get("/", productController.getAll);

// Lấy sản phẩm theo ID
router.get("/:id", productController.getById);

// Tạo sản phẩm
router.post("/", productController.create);

// Cập nhật sản phẩm
router.put("/:id", productController.update);

// Xóa sản phẩm
router.delete("/:id", productController.delete);

module.exports = router;