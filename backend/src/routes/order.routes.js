const express = require("express");

const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const {
  validateCreateOrder,
  validateOrderStatus
} = require("../middlewares/validateOrder.middleware");

const router = express.Router();

// Khách hàng
router.post(
  "/",
  auth,
  validateCreateOrder,
  orderController.createOrder
);

router.get(
  "/my-orders",
  auth,
  orderController.getMyOrders
);

router.patch(
  "/:id/cancel",
  auth,
  orderController.cancelOrder
);

// Quản trị viên
router.get(
  "/",
  auth,
  authorize("admin"),
  orderController.getAllOrders
);

router.patch(
  "/:id/status",
  auth,
  authorize("admin"),
  validateOrderStatus,
  orderController.updateOrderStatus
);

router.get(
  "/:id/tracking",
  auth,
  orderController.getOrderTracking
);

// Đặt route /:id ở cuối
router.get(
  "/:id",
  auth,
  orderController.getOrderById
);

module.exports = router;