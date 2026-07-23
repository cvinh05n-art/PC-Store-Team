const orderService = require("../services/order.service");

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Đặt hàng thành công",
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);

    res.status(200).json({
      success: true,
      total: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders(req.query);

    res.status(200).json({
      success: true,
      total: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng"
      });
    }

    const ownerId = order.user._id.toString();

    if (req.user.role !== "admin" && ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền xem đơn hàng này"
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ID đơn hàng không hợp lệ"
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.orderStatus
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái đơn hàng thành công",
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await orderService.cancelOrder(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Hủy đơn hàng thành công",
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};