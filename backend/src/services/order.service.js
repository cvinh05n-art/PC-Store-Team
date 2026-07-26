const mongoose = require("mongoose");

const Order = require("../models/order.model");
const Product = require("../models/product.model");

const allowedTransitions = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipping", "cancelled"],
  shipping: ["delivered"],
  delivered: [],
  cancelled: []
};

const createOrder = async (userId, orderData) => {
  const { items, shippingAddress, paymentMethod, note } = orderData;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Không tìm thấy sản phẩm ${item.product}`);
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `Sản phẩm "${product.name}" chỉ còn ${product.stock} sản phẩm`
        );
      }

      // Lấy giá từ database, không lấy giá do client gửi lên
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });

      totalAmount += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save({ session });
    }

    const createdOrders = await Order.create(
  [
    {
      user: userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      note,

      orderStatus: "pending",

      statusHistory: [
        {
          status: "pending",
          note: "Đơn hàng đã được tạo",
          updatedBy: userId,
          updatedAt: new Date()
        }
      ]
    }
  ],
  { session }
);

    await session.commitTransaction();

    return createdOrders[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const getMyOrders = async (userId) => {
  return Order.find({ user: userId })
    .populate("items.product", "name image")
    .sort({ createdAt: -1 });
};

const getAllOrders = async (query) => {
  const filter = {};

  if (query.status) {
    filter.orderStatus = query.status;
  }

  return Order.find(filter)
    .populate("user", "name email")
    .populate("items.product", "name image")
    .sort({ createdAt: -1 });
};

const getOrderById = async (orderId) => {
  return Order.findById(orderId)
    .populate("user", "name email")
    .populate("items.product", "name image");
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

  const currentStatus = order.orderStatus;
  const nextStatuses = allowedTransitions[currentStatus] || [];

  if (!nextStatuses.includes(newStatus)) {
    throw new Error(
      `Không thể chuyển trạng thái từ "${currentStatus}" sang "${newStatus}"`
    );
  }

  order.orderStatus = newStatus;

  order.statusHistory.push({
    status: newStatus,
    note: note || `Đơn hàng chuyển sang trạng thái ${newStatus}`,
    updatedBy: adminId,
    updatedAt: new Date()
  });

  if (newStatus === "delivered") {
    order.paymentStatus = "paid";
  }

  await order.save();

  return Order.findById(order._id)
    .populate("user", "name email")
    .populate("statusHistory.updatedBy", "name email");
};

const cancelOrder = async (orderId, userId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const order = await Order.findOne({
      _id: orderId,
      user: userId
    }).session(session);

    if (!order) {
      throw new Error("Không tìm thấy đơn hàng");
    }

    if (!["pending", "confirmed"].includes(order.orderStatus)) {
      throw new Error("Đơn hàng này không thể hủy");
    }

    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: item.quantity
          }
        },
        { session }
      );
    }

    order.orderStatus = "cancelled";
    order.cancelledAt = new Date();

    order.statusHistory.push({
     status: "cancelled",
     note: "Khách hàng đã hủy đơn",
     updatedBy: userId,
     updatedAt: new Date()
  });

    await order.save({ session });
    await session.commitTransaction();

    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getOrderTracking
};