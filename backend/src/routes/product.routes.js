const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// Public
router.get("/", productController.getAll);
router.get("/:id", productController.getById);

// Admin only
router.post("/", auth, authorize("admin"), productController.create);
router.put("/:id", auth, authorize("admin"), productController.update);
router.delete("/:id", auth, authorize("admin"), productController.delete);

module.exports = router;
