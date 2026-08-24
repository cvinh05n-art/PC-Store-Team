const express = require("express");

const router = express.Router();

const userController =
    require("../controllers/user.controller");

const authenticateToken =
    require("../middlewares/auth.middleware");

const authorizeRoles =
    require("../middlewares/role.middleware");


// Tất cả API quản lý user chỉ dành cho ADMIN

router.use(authenticateToken);
router.use(authorizeRoles("ADMIN"));


// =========================
// GET USERS
// =========================

router.get(
    "/",
    userController.getUsers
);


// =========================
// CREATE USER
// =========================

router.post(
    "/",
    userController.createUser
);


// =========================
// UPDATE USER
// =========================

router.put(
    "/:id",
    userController.updateUser
);


// =========================
// TOGGLE STATUS
// =========================

router.patch(
    "/:id/status",
    userController.toggleUserStatus
);


// =========================
// DELETE USER
// =========================

router.delete(
    "/:id",
    userController.deleteUser
);


module.exports = router;