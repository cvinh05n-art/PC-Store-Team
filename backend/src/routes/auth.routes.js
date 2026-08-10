const express = require("express");

const router = express.Router();

const authController =
    require("../controllers/auth.controller");

const authenticateToken =
    require("../middlewares/auth.middleware");

const authorizeRoles =
    require("../middlewares/role.middleware");

router.post(
    "/register",
    authController.register
);

router.post(
    "/login",
    authController.login
);

router.get(
    "/profile",
    authenticateToken,
    (req, res) => {
        res.json({
            success: true,
            message:
                "Bạn đã được xác thực thành công",
            user: req.user
        });
    }
);

router.get(
    "/admin-test",
    authenticateToken,
    authorizeRoles("ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "Bạn là Admin"
        });
    }
);

module.exports = router;