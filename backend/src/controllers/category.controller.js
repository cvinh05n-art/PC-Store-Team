const Category = require("../models/category.model");

// POST /api/categories
exports.createCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Tên danh mục không được để trống"
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim()
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Tên danh mục đã tồn tại"
      });
    }

    const category = await Category.create({
      name: name.trim(),
      description,
      status
    });

    return res.status(201).json({
      success: true,
      message: "Thêm danh mục thành công",
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
      error: error.message
    });
  }
};

// GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: categories.length,
      data: categories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
      error: error.message
    });
  }
};

// GET /api/categories/:id
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục"
      });
    }

    return res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "ID danh mục không hợp lệ"
    });
  }
};

// PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật danh mục thành công",
      data: category
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Tên danh mục đã tồn tại"
      });
    }

    return res.status(400).json({
      success: false,
      message: "Dữ liệu cập nhật không hợp lệ",
      error: error.message
    });
  }
};

// DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Xóa danh mục thành công"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "ID danh mục không hợp lệ"
    });
  }
};