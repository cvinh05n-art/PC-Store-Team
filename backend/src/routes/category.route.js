const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

router.post("/", auth, authorize("admin"), categoryController.createCategory);
router.put("/:id", auth, authorize("admin"), categoryController.updateCategory);
router.delete("/:id", auth, authorize("admin"), categoryController.deleteCategory);

module.exports = router;