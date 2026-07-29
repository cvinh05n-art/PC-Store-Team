const mongoose = require("mongoose");

const Order = require("../models/order.model");
const Product = require("../models/product.model");
require("../models/user.model");

const allowedTransitions = {
  pending: ["confirmed"],
  confirmed: ["shipping"],
  shipping: ["delivered"],
  delivered: [],
  cancelled: []
};

const restoreStock = async (items) => {
  await Promise.all(
    items.map((item) =>
      Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      })
    )
  );
};

const createOrder = async (userId, orderData) => {
  const {
    items,
    shippingAddress,
    paymentMethod = "COD",
    note = ""
  } = orderData;

  const reservedItems = [];
  const orderItems = [];

  try {
    // Trừ tồn kho có điều kiện để tránh bán vượt số lượng hiện có.
    for (const item of items) {
      const product = await Product.findOneAndUpdate(
        {
          _id: item.product,
          status: { $ne: false },
          stock: { $gte: item.quantity }
        },
        {
          $inc: { stock: -item.quantity }
        },
        {
          new: false
        }
      );

      if (!product) {
        const existingProduct = await Product.findById(item.product);

        if (!existingProduct) {
          throw new Error(`Không tìm thấy sản phẩm ${item.product}`);
        }

        throw new Error(
          `Sản phẩm "${existingProduct.name}" không đủ hàng`
        );
      }

      reservedItems.push({
        product: product._id,
        quantity: item.quantity
      });

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return await Order.create({
      user: userId,
      items: orderItems,
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        phone: shippingAddress.phone.trim(),
        address: shippingAddress.address.trim()
      },
      paymentMethod,
      totalAmount,
      note,
      orderStatus: "pending",
      statusHistory: [
        {
          status: "pending",
          note: "Đơn hàng đã được tạo",
          updatedBy: userId
        }
      ]
    });
  } catch (error) {
    // Hoàn lại các sản phẩm đã giữ nếu tạo đơn thất bại giữa chừng.
    if (reservedItems.length > 0) {
      await restoreStock(reservedItems);
    }

    throw error;
  }
};

const getMyOrders = async (userId) => {
  return Order.find({ user: userId })
    .populate("items.product", "name image")
    .sort({ createdAt: -1 });
};

const getAllOrders = async (query = {}) => {
  const filter = {};

  if (query.status) {
    filter.orderStatus = query.status;
  }

  if (query.user && mongoose.isValidObjectId(query.user)) {
    filter.user = query.user;
  }

  return Order.find(filter)
    .populate("user", "name email")
    .populate("items.product", "name image")
    .sort({ createdAt: -1 });
};

const getOrderById = async (orderId) => {
  return Order.findById(orderId)
    .populate("user", "name email")
    .populate("items.product", "name image")
    .populate("statusHistory.updatedBy", "name email");
};

const getOrderTracking = async (orderId) => {
  return Order.findById(orderId)
    .select(
      "user orderStatus paymentStatus statusHistory createdAt updatedAt deliveredAt cancelledAt"
    )
    .populate("statusHistory.updatedBy", "name email");
};

const updateOrderStatus = async (
  orderId,
  newStatus,
  adminId,
  note
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Không tìm thấy đơn hàng");
  }

  const validNextStatuses = allowedTransitions[order.orderStatus] || [];

  if (!validNextStatuses.includes(newStatus)) {
    throw new Error(
      `Không thể chuyển trạng thái từ "${order.orderStatus}" sang "${newStatus}"`
    );
  }

  const setFields = {
    orderStatus: newStatus
  };

  if (newStatus === "delivered") {
    setFields.deliveredAt = new Date();

    if (order.paymentMethod === "COD") {
      setFields.paymentStatus = "paid";
    }
  }

  const updatedOrder = await Order.findOneAndUpdate(
    {
      _id: orderId,
      orderStatus: order.orderStatus
    },
    {
      $set: setFields,
      $push: {
        statusHistory: {
          status: newStatus,
          note:
            note?.trim() ||
            `Đơn hàng chuyển sang trạng thái ${newStatus}`,
          updatedBy: adminId,
          updatedAt: new Date()
        }
      }
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!updatedOrder) {
    throw new Error(
      "Đơn hàng vừa được cập nhật bởi người khác, vui lòng tải lại"
    );
  }

  return getOrderById(updatedOrder._id);
};

const cancelOrder = async (orderId, userId) => {
  const cancelledAt = new Date();
  const order = await Order.findOneAndUpdate(
    {
      _id: orderId,
      user: userId,
      orderStatus: { $in: ["pending", "confirmed"] }
    },
    {
      $set: {
        orderStatus: "cancelled",
        cancelledAt
      },
      $push: {
        statusHistory: {
          status: "cancelled",
          note: "Khách hàng đã hủy đơn",
          updatedBy: userId,
          updatedAt: cancelledAt
        }
      }
    },
    {
      new: false
    }
  );

  if (!order) {
    const existingOrder = await Order.findOne({
      _id: orderId,
      user: userId
    });

    if (!existingOrder) {
      throw new Error("Không tìm thấy đơn hàng");
    }

    throw new Error("Chỉ có thể hủy đơn đang chờ hoặc đã xác nhận");
  }

  await restoreStock(order.items);

  if (order.paymentStatus === "paid") {
    await Order.findByIdAndUpdate(orderId, {
      $set: { paymentStatus: "refunded" }
    });
  }

  return getOrderById(orderId);
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  getOrderTracking,
  updateOrderStatus,
  cancelOrder
};
