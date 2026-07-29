const express = require("express");

const brandController = require("../controllers/brand.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

// Xem danh sách và chi tiết thương hiệu
router.get("/", brandController.getBrands);
router.get("/:id", brandController.getBrandById);

// Thêm, sửa và xóa thương hiệu
router.post("/", auth, brandController.createBrand);
router.put("/:id", auth, brandController.updateBrand);
router.delete("/:id", auth, brandController.deleteBrand);

module.exports = router;