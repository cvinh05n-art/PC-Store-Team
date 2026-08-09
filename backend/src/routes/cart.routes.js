const express = require("express");

const router = express.Router();

const {
    getCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
} = require("../controllers/cart.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getCart);

router.post("/", authMiddleware, addToCart);

router.delete("/clear", authMiddleware, clearCart);

router.put("/:id", authMiddleware, updateQuantity);

router.delete("/:id", authMiddleware, removeItem);

module.exports = router;