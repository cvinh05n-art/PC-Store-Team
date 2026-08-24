
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../src/models/user.model");
const Category = require("../src/models/category.model");
const Brand = require("../src/models/brand.model");
const Product = require("../src/models/product.model");
const Order = require("../src/models/order.model");
const Cart = require("../src/models/cart.model");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/product_management";

const money = (value) => Number(value);

/* =========================
   XÓA DỮ LIỆU CŨ
========================= */

async function clearDatabase() {
  console.log("🧹 Xóa dữ liệu test cũ...");

  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Brand.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({}),
    Cart.deleteMany({})
  ]);
}

/* =========================
   USERS
========================= */

async function seedUsers() {
  const passwordAdmin = await bcrypt.hash("Admin123456", 10);
  const passwordUser = await bcrypt.hash("User123456", 10);

  return User.insertMany([
    {
      name: "Quản trị viên PC Store",
      email: "admin@pcstore.com",
      password: passwordAdmin,
      role: "ADMIN",
      status: true
    },
    {
      name: "Nguyễn Văn User",
      email: "user@pcstore.com",
      password: passwordUser,
      role: "USER",
      status: true
    }
  ]);
}

/* =========================
   CATEGORIES
========================= */

async function seedCategories() {
  return Category.insertMany([
    {
      name: "CPU",
      description: "Bộ vi xử lý dành cho máy tính bàn",
      status: true
    },
    {
      name: "GPU",
      description: "Card đồ họa cho gaming, đồ họa và AI",
      status: true
    },
    {
      name: "RAM",
      description: "Bộ nhớ trong DDR4 và DDR5",
      status: true
    },
    {
      name: "Mainboard",
      description: "Bo mạch chủ cho các nền tảng Intel và AMD",
      status: true
    },
    {
      name: "SSD",
      description: "Ổ cứng SSD SATA và NVMe",
      status: true
    },
    {
      name: "HDD",
      description: "Ổ cứng lưu trữ dung lượng lớn",
      status: true
    },
    {
      name: "PSU",
      description: "Nguồn máy tính",
      status: true
    },
    {
      name: "Case",
      description: "Vỏ case máy tính",
      status: true
    }
  ]);
}

/* =========================
   BRANDS
========================= */

async function seedBrands() {
  return Brand.insertMany([
    {
      name: "Intel",
      description: "Nhà sản xuất CPU và nền tảng máy tính",
      country: "Mỹ",
      logo: "https://logo.clearbit.com/intel.com",
      status: true
    },
    {
      name: "AMD",
      description: "Nhà sản xuất CPU và GPU",
      country: "Mỹ",
      logo: "https://logo.clearbit.com/amd.com",
      status: true
    },
    {
      name: "NVIDIA",
      description: "Nhà sản xuất GPU và nền tảng AI",
      country: "Mỹ",
      logo: "https://logo.clearbit.com/nvidia.com",
      status: true
    },
    {
      name: "ASUS",
      description: "Thiết bị và linh kiện máy tính",
      country: "Đài Loan",
      logo: "https://logo.clearbit.com/asus.com",
      status: true
    },
    {
      name: "MSI",
      description: "Linh kiện và thiết bị gaming",
      country: "Đài Loan",
      logo: "https://logo.clearbit.com/msi.com",
      status: true
    },
    {
      name: "GIGABYTE",
      description: "Mainboard, GPU và linh kiện PC",
      country: "Đài Loan",
      logo: "https://logo.clearbit.com/gigabyte.com",
      status: true
    }
  ]);
}

/* =========================
   PRODUCTS
========================= */

async function seedProducts(categories, brands) {
  const category = Object.fromEntries(
    categories.map((item) => [item.name, item._id])
  );

  const brand = Object.fromEntries(
    brands.map((item) => [item.name, item._id])
  );

  const products = [
    {
      name: "Intel Core i5-12400F",
      price: money(3290000),
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704",
      description:
        "CPU Intel Core i5-12400F, 6 nhân 12 luồng, socket LGA1700.",
      category: category.CPU,
      brand: brand.Intel,
      status: true
    },
    {
      name: "Intel Core i7-12700K",
      price: money(6990000),
      stock: 9,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704",
      description:
        "CPU Intel Core i7-12700K dành cho gaming và workstation.",
      category: category.CPU,
      brand: brand.Intel,
      status: true
    },
    {
      name: "AMD Ryzen 5 5600",
      price: money(2890000),
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704",
      description:
        "CPU Ryzen 5 5600, 6 nhân 12 luồng, socket AM4.",
      category: category.CPU,
      brand: brand.AMD,
      status: true
    },
    {
      name: "AMD Ryzen 7 5700X",
      price: money(4290000),
      stock: 7,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704",
      description:
        "CPU Ryzen 7 5700X, phù hợp gaming và đa nhiệm.",
      category: category.CPU,
      brand: brand.AMD,
      status: true
    },

    {
      name: "ASUS Dual RTX 4060 8GB",
      price: money(8290000),
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704",
      description:
        "GPU RTX 4060 8GB dành cho gaming Full HD và QHD.",
      category: category.GPU,
      brand: brand.ASUS,
      status: true
    },
    {
      name: "MSI RTX 4070 SUPER 12GB",
      price: money(16990000),
      stock: 4,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704",
      description:
        "GPU RTX 4070 SUPER 12GB hiệu năng cao cho gaming QHD.",
      category: category.GPU,
      brand: brand.MSI,
      status: true
    },
    {
      name: "GIGABYTE RTX 4060 Ti 8GB",
      price: money(9990000),
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704",
      description:
        "GPU RTX 4060 Ti 8GB cho gaming và đồ họa.",
      category: category.GPU,
      brand: brand.GIGABYTE,
      status: true
    },
    {
      name: "ASUS TUF RTX 4080 SUPER 16GB",
      price: money(29990000),
      stock: 2,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704",
      description:
        "GPU cao cấp RTX 4080 SUPER 16GB.",
      category: category.GPU,
      brand: brand.ASUS,
      status: true
    },

    {
      name: "Kingston Fury Beast 16GB DDR4 3200",
      price: money(990000),
      stock: 25,
      image:
        "https://images.unsplash.com/photo-1562976540-1502c2145186",
      description: "RAM 16GB DDR4 3200MHz.",
      category: category.RAM,
      brand: brand.ASUS,
      status: true
    },
    {
      name: "Kingston Fury Beast 32GB DDR5 5600",
      price: money(2390000),
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1562976540-1502c2145186",
      description: "RAM 32GB DDR5 5600MHz.",
      category: category.RAM,
      brand: brand.Intel,
      status: true
    },

    {
      name: "ASUS PRIME B660M-A WIFI",
      price: money(3290000),
      stock: 10,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea",
      description:
        "Mainboard B660M hỗ trợ Intel LGA1700 và DDR4.",
      category: category.Mainboard,
      brand: brand.ASUS,
      status: true
    },
    {
      name: "MSI B650M PRO-VDH WIFI",
      price: money(3490000),
      stock: 11,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea",
      description:
        "Mainboard B650M cho nền tảng AMD AM5.",
      category: category.Mainboard,
      brand: brand.MSI,
      status: true
    },
    {
      name: "GIGABYTE B760M DS3H AX",
      price: money(2990000),
      stock: 3,
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea",
      description:
        "Mainboard B760M DDR5, Wi-Fi và Bluetooth.",
      category: category.Mainboard,
      brand: brand.GIGABYTE,
      status: true
    },

    {
      name: "Samsung 990 EVO 1TB NVMe",
      price: money(2290000),
      stock: 14,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
      description: "SSD NVMe 1TB tốc độ cao.",
      category: category.SSD,
      brand: brand.ASUS,
      status: true
    },
    {
      name: "Kingston NV2 1TB NVMe",
      price: money(1590000),
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
      description:
        "SSD NVMe 1TB giá tốt cho PC gaming.",
      category: category.SSD,
      brand: brand.ASUS,
      status: true
    },
    {
      name: "WD Blue 1TB SATA SSD",
      price: money(1490000),
      stock: 16,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
      description: "SSD SATA 2.5 inch 1TB.",
      category: category.SSD,
      brand: brand.GIGABYTE,
      status: true
    },

    {
      name: "WD Blue 2TB HDD 7200RPM",
      price: money(1590000),
      stock: 13,
      image:
        "https://images.unsplash.com/photo-1601737487795-dab272f52420",
      description:
        "HDD 2TB 7200RPM dùng lưu trữ dữ liệu.",
      category: category.HDD,
      brand: brand.ASUS,
      status: true
    },

    {
      name: "Corsair CX650 650W 80+ Bronze",
      price: money(1690000),
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad",
      description:
        "Nguồn 650W chuẩn 80 Plus Bronze.",
      category: category.PSU,
      brand: brand.ASUS,
      status: true
    },
    {
      name: "MSI MAG A750GL 750W Gold",
      price: money(2290000),
      stock: 4,
      image:
        "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad",
      description:
        "Nguồn 750W 80 Plus Gold, phù hợp GPU hiệu năng cao.",
      category: category.PSU,
      brand: brand.MSI,
      status: true
    },

    {
      name: "ASUS Prime AP201 Mesh",
      price: money(1890000),
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1587831990711-23ca6441447b",
      description:
        "Case Micro-ATX dạng lưới, thiết kế nhỏ gọn.",
      category: category.Case,
      brand: brand.ASUS,
      status: true
    }
  ];

  return Product.insertMany(products);
}

/* =========================
   ORDER HELPER
========================= */

function item(product, quantity = 1) {
  return {
    product: product._id,
    name: product.name,
    price: product.price,
    quantity
  };
}

function total(items) {
  return items.reduce(
    (sum, current) =>
      sum + current.price * current.quantity,
    0
  );
}

function history(status, userId, note, updatedAt) {
  return {
    status,
    note,
    updatedBy: userId,
    updatedAt
  };
}

/* =========================
   ORDERS
========================= */

async function seedOrders(users, products) {
  const admin = users.find(
    (u) => u.email === "admin@pcstore.com"
  );

  const user = users.find(
    (u) => u.email === "user@pcstore.com"
  );

  const byName = Object.fromEntries(
    products.map((product) => [
      product.name,
      product
    ])
  );

  const now = Date.now();

  const daysAgo = (days) =>
    new Date(
      now - days * 24 * 60 * 60 * 1000
    );

  const order1Items = [
    item(
      byName["Intel Core i5-12400F"],
      1
    ),
    item(
      byName["ASUS Dual RTX 4060 8GB"],
      1
    ),
    item(
      byName["Kingston Fury Beast 16GB DDR4 3200"],
      2
    )
  ];

  const order2Items = [
    item(
      byName["AMD Ryzen 5 5600"],
      1
    ),
    item(
      byName["MSI B650M PRO-VDH WIFI"],
      1
    ),
    item(
      byName["Kingston NV2 1TB NVMe"],
      1
    )
  ];

  const order3Items = [
    item(
      byName["MSI RTX 4070 SUPER 12GB"],
      1
    ),
    item(
      byName["MSI MAG A750GL 750W Gold"],
      1
    )
  ];

  const order4Items = [
    item(
      byName["Intel Core i7-12700K"],
      1
    ),
    item(
      byName["ASUS PRIME B660M-A WIFI"],
      1
    ),
    item(
      byName["Kingston Fury Beast 32GB DDR5 5600"],
      2
    )
  ];

  const order5Items = [
    item(
      byName["WD Blue 2TB HDD 7200RPM"],
      1
    ),
    item(
      byName["ASUS Prime AP201 Mesh"],
      1
    )
  ];

  const order6Items = [
    item(
      byName["AMD Ryzen 7 5700X"],
      1
    ),
    item(
      byName["GIGABYTE RTX 4060 Ti 8GB"],
      1
    )
  ];

  return Order.insertMany([
    {
      user: user._id,
      items: order1Items,

      shippingAddress: {
        fullName: "Nguyễn Văn User",
        phone: "0901234567",
        address:
          "123 Nguyễn Trãi, Quận 5, TP. Hồ Chí Minh"
      },

      paymentMethod: "COD",
      paymentStatus: "paid",
      orderStatus: "delivered",

      totalAmount: total(order1Items),

      note: "Giao giờ hành chính",

      statusHistory: [
        history(
          "pending",
          user._id,
          "Đơn hàng được tạo",
          daysAgo(18)
        ),
        history(
          "confirmed",
          admin._id,
          "Admin xác nhận đơn",
          daysAgo(17)
        ),
        history(
          "shipping",
          admin._id,
          "Đã bàn giao đơn vị vận chuyển",
          daysAgo(16)
        ),
        history(
          "delivered",
          admin._id,
          "Đã giao hàng thành công",
          daysAgo(14)
        )
      ],

      deliveredAt: daysAgo(14),
      createdAt: daysAgo(18),
      updatedAt: daysAgo(14)
    },

    {
      user: user._id,
      items: order2Items,

      shippingAddress: {
        fullName: "Nguyễn Văn User",
        phone: "0901234567",
        address:
          "456 Lê Văn Sỹ, Quận 3, TP. Hồ Chí Minh"
      },

      paymentMethod: "BANK_TRANSFER",
      paymentStatus: "paid",
      orderStatus: "delivered",

      totalAmount: total(order2Items),

      note: "Đã thanh toán chuyển khoản",

      statusHistory: [
        history(
          "pending",
          user._id,
          "Đơn hàng được tạo",
          daysAgo(42)
        ),
        history(
          "confirmed",
          admin._id,
          "Đã xác nhận thanh toán",
          daysAgo(41)
        ),
        history(
          "shipping",
          admin._id,
          "Đã gửi hàng",
          daysAgo(40)
        ),
        history(
          "delivered",
          admin._id,
          "Giao thành công",
          daysAgo(38)
        )
      ],

      deliveredAt: daysAgo(38),
      createdAt: daysAgo(42),
      updatedAt: daysAgo(38)
    },

    {
      user: user._id,
      items: order3Items,

      shippingAddress: {
        fullName: "Trần Minh Khoa",
        phone: "0912345678",
        address:
          "88 Điện Biên Phủ, Bình Thạnh, TP. Hồ Chí Minh"
      },

      paymentMethod: "BANK_TRANSFER",
      paymentStatus: "paid",
      orderStatus: "shipping",

      totalAmount: total(order3Items),

      note: "Gọi trước khi giao",

      statusHistory: [
        history(
          "pending",
          user._id,
          "Đơn hàng được tạo",
          daysAgo(5)
        ),
        history(
          "confirmed",
          admin._id,
          "Đã xác nhận đơn",
          daysAgo(4)
        ),
        history(
          "shipping",
          admin._id,
          "Đơn đang được vận chuyển",
          daysAgo(2)
        )
      ],

      createdAt: daysAgo(5),
      updatedAt: daysAgo(2)
    },

    {
      user: user._id,
      items: order4Items,

      shippingAddress: {
        fullName: "Lê Hoàng Nam",
        phone: "0987654321",
        address:
          "25 Phạm Văn Đồng, Thủ Đức, TP. Hồ Chí Minh"
      },

      paymentMethod: "COD",
      paymentStatus: "unpaid",
      orderStatus: "confirmed",

      totalAmount: total(order4Items),

      note: "Kiểm tra sản phẩm trước khi nhận",

      statusHistory: [
        history(
          "pending",
          user._id,
          "Đơn hàng được tạo",
          daysAgo(2)
        ),
        history(
          "confirmed",
          admin._id,
          "Đã xác nhận đơn hàng",
          daysAgo(1)
        )
      ],

      createdAt: daysAgo(2),
      updatedAt: daysAgo(1)
    },

    {
      user: user._id,
      items: order5Items,

      shippingAddress: {
        fullName: "Phạm Gia Huy",
        phone: "0938123456",
        address:
          "10 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
      },

      paymentMethod: "COD",
      paymentStatus: "unpaid",
      orderStatus: "pending",

      totalAmount: total(order5Items),

      note: "Khách đặt thử để test",

      statusHistory: [
        history(
          "pending",
          user._id,
          "Đơn hàng đang chờ xác nhận",
          daysAgo(1)
        )
      ],

      createdAt: daysAgo(1),
      updatedAt: daysAgo(1)
    },

    {
      user: user._id,
      items: order6Items,

      shippingAddress: {
        fullName: "Đỗ Minh Quân",
        phone: "0977001122",
        address:
          "72 Quang Trung, Gò Vấp, TP. Hồ Chí Minh"
      },

      paymentMethod: "COD",
      paymentStatus: "refunded",
      orderStatus: "cancelled",

      totalAmount: total(order6Items),

      note: "Khách hủy do đổi cấu hình",

      statusHistory: [
        history(
          "pending",
          user._id,
          "Đơn hàng được tạo",
          daysAgo(10)
        ),
        history(
          "confirmed",
          admin._id,
          "Đã xác nhận đơn",
          daysAgo(9)
        ),
        history(
          "cancelled",
          admin._id,
          "Đơn hàng bị hủy theo yêu cầu khách",
          daysAgo(7)
        )
      ],

      cancelledAt: daysAgo(7),
      createdAt: daysAgo(10),
      updatedAt: daysAgo(7)
    }
  ]);
}

/* =========================
   CART
========================= */

async function seedCart(users, products) {
  const user = users.find(
    (u) => u.email === "user@pcstore.com"
  );

  const product1 = products.find(
    (p) => p.name === "Kingston NV2 1TB NVMe"
  );

  const product2 = products.find(
    (p) => p.name === "Intel Core i5-12400F"
  );

  const product3 = products.find(
    (p) => p.name === "ASUS Prime AP201 Mesh"
  );

  return Cart.insertMany([
    {
      userId: user._id,
      productId: product1._id,
      quantity: 1
    },
    {
      userId: user._id,
      productId: product2._id,
      quantity: 1
    },
    {
      userId: user._id,
      productId: product3._id,
      quantity: 2
    }
  ]);
}

/* =========================
   MAIN
========================= */

async function main() {
  try {
    console.log("========================================");
    console.log("       PC STORE TEAM - SEED DATA");
    console.log("========================================");

    console.log(`MongoDB: ${MONGO_URI}`);

    await mongoose.connect(MONGO_URI);

    console.log("✅ Kết nối MongoDB thành công");

    await clearDatabase();

    const users = await seedUsers();
    console.log(`✅ Users: ${users.length}`);

    const categories = await seedCategories();
    console.log(`✅ Categories: ${categories.length}`);

    const brands = await seedBrands();
    console.log(`✅ Brands: ${brands.length}`);

    const products = await seedProducts(
      categories,
      brands
    );
    console.log(`✅ Products: ${products.length}`);

    const orders = await seedOrders(
      users,
      products
    );
    console.log(`✅ Orders: ${orders.length}`);

    const carts = await seedCart(
      users,
      products
    );
    console.log(`✅ Cart items: ${carts.length}`);

    console.log("\n========================================");
    console.log("🎉 SEED THÀNH CÔNG!");
    console.log("========================================");

    console.log("\nTài khoản test:");
    console.log(
      "ADMIN: admin@pcstore.com / Admin123456"
    );
    console.log(
      "USER : user@pcstore.com  / User123456"
    );

    console.log("\nDữ liệu đã tạo:");
    console.log("- 2 users");
    console.log("- 8 categories");
    console.log("- 6 brands");
    console.log("- 20 products");
    console.log("- 6 orders");
    console.log("- 3 cart items");

    console.log(
      "\n⚠️ Lưu ý: script này XÓA dữ liệu trong các collection trên trước khi seed."
    );
  } catch (error) {
    console.error("\n❌ SEED THẤT BẠI:");
    console.error(error);

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();

    console.log(
      "\n🔌 Đã đóng kết nối MongoDB."
    );
  }
}

main();