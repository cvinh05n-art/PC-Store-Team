const Brand = require("../models/brand.model");

// POST /api/brands
exports.createBrand = async (req, res) => {
  try {
    const { name, description, country, logo, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Tên thương hiệu không được để trống"
      });
    }

    const existingBrand = await Brand.findOne({
      name: name.trim()
    });

    if (existingBrand) {
      return res.status(409).json({
        success: false,
        message: "Tên thương hiệu đã tồn tại"
      });
    }

    const brand = await Brand.create({
      name: name.trim(),
      description,
      country,
      logo,
      status
    });

    return res.status(201).json({
      success: true,
      message: "Thêm thương hiệu thành công",
      data: brand
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
      error: error.message
    });
  }
};

// GET /api/brands
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: brands.length,
      data: brands
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
      error: error.message
    });
  }
};

// GET /api/brands/:id
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thương hiệu"
      });
    }

    return res.status(200).json({
      success: true,
      data: brand
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "ID thương hiệu không hợp lệ"
    });
  }
};

// PUT /api/brands/:id
exports.updateBrand = async (req, res) => {
  try {
    const { name, description, country, logo, status } = req.body;

    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        country,
        logo,
        status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thương hiệu"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thương hiệu thành công",
      data: brand
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Tên thương hiệu đã tồn tại"
      });
    }

    return res.status(400).json({
      success: false,
      message: "Dữ liệu hoặc ID không hợp lệ",
      error: error.message
    });
  }
};

// DELETE /api/brands/:id
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thương hiệu"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Xóa thương hiệu thành công"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "ID thương hiệu không hợp lệ"
    });
  }
};