const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.find({ userId })
            .populate("productId");

        const result = cart.map((item) => ({
            id: item._id,
            productId: item.productId?._id,
            name: item.productId?.name,
            price: item.productId?.price || 0,
            image: item.productId?.image,
            quantity: item.quantity,
        }));

        res.json(result);
    } catch (error) {
        console.error("Lỗi lấy giỏ hàng:", error);

        res.status(500).json({
            message: "Không thể lấy giỏ hàng",
        });
    }
};

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        let cartItem = await Cart.findOne({
            userId,
            productId,
        });

        if (cartItem) {
            cartItem.quantity += Number(quantity);
            await cartItem.save();
        } else {
            cartItem = await Cart.create({
                userId,
                productId,
                quantity,
            });
        }

        res.status(201).json({
            message: "Thêm sản phẩm vào giỏ hàng thành công",
            cartItem,
        });
    } catch (error) {
        console.error("Lỗi thêm giỏ hàng:", error);

        res.status(500).json({
            message: "Không thể thêm vào giỏ hàng",
        });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                message: "Số lượng phải lớn hơn 0",
            });
        }

        const cartItem = await Cart.findOneAndUpdate(
            {
                _id: id,
                userId,
            },
            {
                quantity,
            },
            {
                new: true,
            }
        );

        if (!cartItem) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm trong giỏ hàng",
            });
        }

        res.json({
            message: "Cập nhật số lượng thành công",
            cartItem,
        });
    } catch (error) {
        console.error("Lỗi cập nhật giỏ hàng:", error);

        res.status(500).json({
            message: "Không thể cập nhật giỏ hàng",
        });
    }
};

const removeItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const item = await Cart.findOneAndDelete({
            _id: id,
            userId,
        });

        if (!item) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        res.json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        console.error("Lỗi xóa sản phẩm:", error);

        res.status(500).json({
            message: "Không thể xóa sản phẩm",
        });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await Cart.deleteMany({
            userId,
        });

        res.json({
            message: "Đã xóa toàn bộ giỏ hàng",
        });
    } catch (error) {
        console.error("Lỗi xóa giỏ hàng:", error);

        res.status(500).json({
            message: "Không thể xóa giỏ hàng",
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
};