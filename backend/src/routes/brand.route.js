const validateBrand = (req, res, next) => {
  const { name, status } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Tên thương hiệu không được để trống"
    });
  }

  if (status !== undefined && typeof status !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Trạng thái phải là true hoặc false"
    });
  }

  req.body.name = name.trim();
  next();
};

module.exports = {
  validateCategory,
  validateBrand
};