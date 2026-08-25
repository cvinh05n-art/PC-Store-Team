const express = require("express");

const router = express.Router();

const userController =
    require("../controllers/user.controller");

const authenticateToken =
    require("../middlewares/auth.middleware");

const authorizeRoles =
    require("../middlewares/role.middleware");


// =====================================================
// AUTHENTICATION
// =====================================================
// Tất cả API trong file này đều yêu cầu đăng nhập.
//
// Sau khi xác thực thành công:
// req.user sẽ chứa thông tin người đang đăng nhập.
// =====================================================

router.use(authenticateToken);


// =====================================================
// UPDATE PROFILE
// =====================================================
// USER và ADMIN đều được phép sửa profile của chính mình.
//
// Ví dụ:
// PUT /api/users/profile
//
// Body:
// {
//     "name": "Nguyen Van A"
// }
//
// Route này PHẢI đặt trước /:id.
// Nếu đặt sau /:id thì "profile" sẽ bị hiểu nhầm
// là giá trị của req.params.id.
// =====================================================

router.put(
    "/profile",
    userController.updateProfile
);


// =====================================================
// CÁC API QUẢN LÝ USER
// =====================================================
// Những API bên dưới chỉ dành cho ADMIN.
// =====================================================

router.use(authorizeRoles("ADMIN"));


// =====================================================
// GET USERS
// =====================================================
// ADMIN xem danh sách tài khoản.
// =====================================================

router.get(
    "/",
    userController.getUsers
);


// =====================================================
// CREATE USER
// =====================================================
// ADMIN tạo tài khoản.
// =====================================================

router.post(
    "/",
    userController.createUser
);


// =====================================================
// UPDATE USER
// =====================================================
// ADMIN chỉnh sửa một tài khoản theo ID.
//
// Ví dụ:
// PUT /api/users/65xxxxxxxxxxxxxxxxxxxxxx
// =====================================================

router.put(
    "/:id",
    userController.updateUser
);


// =====================================================
// TOGGLE USER STATUS
// =====================================================
// ADMIN khóa / mở khóa tài khoản.
// =====================================================

router.patch(
    "/:id/status",
    userController.toggleUserStatus
);


// =====================================================
// DELETE USER
// =====================================================
// ADMIN xóa tài khoản.
// =====================================================

router.delete(
    "/:id",
    userController.deleteUser
);


module.exports = router;