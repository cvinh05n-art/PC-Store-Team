const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const getDashboardSummary = async () => {
  const [
    totalUsers,
    totalProducts,
    totalOrders,
    revenueResult,
    orderStatus,
    revenueByMonth,
    topProducts,
    recentOrders,
    lowStockProducts
  ] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([
      {
        $match: {
          orderStatus: "delivered",
          paymentStatus: "paid"
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]),
    Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1
        }
      }
    ]),
    Order.aggregate([
      {
        $match: {
          orderStatus: "delivered",
          paymentStatus: "paid"
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      },
      {
        $limit: 12
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          revenue: 1,
          orders: 1
        }
      }
    ]),
    Order.aggregate([
      {
        $match: {
          orderStatus: "delivered"
        }
      },
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: "$items.product",
          name: { $first: "$items.name" },
          quantitySold: { $sum: "$items.quantity" },
          revenue: {
            $sum: {
              $multiply: ["$items.price", "$items.quantity"]
            }
          }
        }
      },
      {
        $sort: {
          quantitySold: -1
        }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: 1,
          quantitySold: 1,
          revenue: 1
        }
      }
    ]),
    Order.find()
      .select(
        "user shippingAddress totalAmount orderStatus paymentStatus createdAt"
      )
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Product.find({
      stock: { $lte: 5 },
      status: { $ne: false }
    })
      .select("name stock image")
      .sort({ stock: 1 })
      .limit(10)
      .lean()
  ]);

  const statusMap = {
    pending: 0,
    confirmed: 0,
    shipping: 0,
    delivered: 0,
    cancelled: 0
  };

  orderStatus.forEach((item) => {
    statusMap[item.status] = item.count;
  });

  return {
    summary: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: revenueResult[0]?.totalRevenue || 0
    },
    orderStatus: statusMap,
    revenueByMonth,
    topProducts,
    recentOrders,
    lowStockProducts
  };
};

module.exports = {
  getDashboardSummary
};