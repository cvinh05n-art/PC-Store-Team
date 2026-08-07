const mongoose = require("mongoose");

const validateCreateOrder = (req, res, next) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Đơn hàng phải có ít nhất một sản phẩm"
    });
  }

  for (const item of items) {
    if (!mongoose.isValidObjectId(item.product)) {
      return res.status(400).json({
        success: false,
        message: "ID sản phẩm không hợp lệ"
      });
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Số lượng sản phẩm phải là số nguyên lớn hơn 0"
      });
    }
  }

  if (
    !shippingAddress?.fullName?.trim() ||
    !shippingAddress?.phone?.trim() ||
    !shippingAddress?.address?.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ thông tin nhận hàng"
    });
  }

  if (
    paymentMethod &&
    !["COD", "BANK_TRANSFER"].includes(paymentMethod)
  ) {
    return res.status(400).json({
      success: false,
      message: "Phương thức thanh toán không hợp lệ"
    });
  }

  next();
};

const validateOrderStatus = (req, res, next) => {
  const allowedStatuses = [
    "pending",
    "confirmed",
    "shipping",
    "delivered"
  ];

  if (!allowedStatuses.includes(req.body.orderStatus)) {
    return res.status(400).json({
      success: false,
      message: "Trạng thái đơn hàng không hợp lệ"
    });
  }

  next();
};

module.exports = {
  validateCreateOrder,
  validateOrderStatus
};
