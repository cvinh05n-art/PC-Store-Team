const express = require("express");

const router = express.Router();

const authController =
    require("../controllers/auth.controller");

const authenticateToken =
    require("../middlewares/auth.middleware");

const authorizeRoles =
    require("../middlewares/role.middleware");

// =========================
// REGISTER
// =========================

router.post(
    "/register",
    authController.register
);


// =========================
// LOGIN
// =========================

router.post(
    "/login",
    authController.login
);


// =========================
// FORGOT PASSWORD
// =========================

router.post(
    "/forgot-password",
    authController.forgotPassword
);


// =========================
// VERIFY OTP
// =========================

router.post(
    "/verify-otp",
    authController.verifyOtp
);


// =========================
// RESET PASSWORD
// =========================

router.post(
    "/reset-password",
    authController.resetPassword
);


// =========================
// PROFILE
// =========================

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


// =========================
// ADMIN TEST
// =========================

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