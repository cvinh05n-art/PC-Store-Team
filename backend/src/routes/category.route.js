const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

router.post("/", auth, categoryController.createCategory);
router.put("/:id", auth, categoryController.updateCategory);
router.delete("/:id", auth, categoryController.deleteCategory);

module.exports = router;