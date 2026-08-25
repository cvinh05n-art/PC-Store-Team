const userService =
    require("../services/user.service");

const userController = {

    // =====================================================
    // GET USERS
    // =====================================================

    async getUsers(req, res) {

        try {

            const {
                search = ""
            } = req.query;

            const users =
                await userService.getUsers(
                    search
                );

            return res.status(200).json({
                success: true,
                data: users
            });

        } catch (error) {

            console.error(
                "Lỗi lấy danh sách user:",
                error
            );

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },


    // =====================================================
    // UPDATE PROFILE
    // =====================================================
    // USER và ADMIN đều có thể sử dụng API này.
    //
    // PUT /api/users/profile
    //
    // Không nhận user ID từ URL.
    // ID của người cần sửa được lấy từ JWT:
    //
    // req.user.id
    //
    // Điều này đảm bảo người dùng chỉ sửa được
    // profile của chính tài khoản đang đăng nhập.
    // =====================================================

    async updateProfile(req, res) {

        try {

            // Kiểm tra token đã cung cấp ID người dùng chưa
            if (!req.user || !req.user.id) {

                return res.status(401).json({
                    success: false,
                    message:
                        "Không xác định được người dùng"
                });

            }

            const {
                name,
                fullName,
                phone,
                address,
                avatar
            } = req.body;


            // Cho phép Frontend gửi name hoặc fullName.
            const finalName =
                name || fullName;


            // Không cho phép cập nhật profile
            // nếu không có dữ liệu hợp lệ.
            if (
                finalName === undefined &&
                phone === undefined &&
                address === undefined &&
                avatar === undefined
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Không có thông tin cần cập nhật"
                });

            }


            // Tạo object dữ liệu cần cập nhật.
            // Chỉ thêm những field thực sự được gửi lên.
            const updateData = {};


            if (finalName !== undefined) {

                updateData.name =
                    String(finalName).trim();

            }


            if (phone !== undefined) {

                updateData.phone =
                    String(phone).trim();

            }


            if (address !== undefined) {

                updateData.address =
                    String(address).trim();

            }


            if (avatar !== undefined) {

                updateData.avatar =
                    avatar;

            }


            // Gọi Service để cập nhật MongoDB.
            //
            // req.user.id:
            // ID của tài khoản đang đăng nhập.
            const user =
                await userService.updateProfile(
                    req.user.id,
                    updateData
                );


            return res.status(200).json({
                success: true,
                message:
                    "Cập nhật thông tin cá nhân thành công",
                data: user
            });

        } catch (error) {

            console.error(
                "Lỗi cập nhật profile:",
                error
            );

            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },


    // =====================================================
    // CREATE USER
    // =====================================================

    async createUser(req, res) {

        try {

            const {
                name,
                fullName,
                email,
                password,
                role
            } = req.body;

            const finalName =
                name || fullName;

            if (
                !finalName ||
                !email ||
                !password
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Vui lòng nhập đầy đủ thông tin"
                });
            }

            const user =
                await userService.createUser(
                    finalName,
                    email,
                    password,
                    role
                );

            return res.status(201).json({
                success: true,
                message:
                    "Tạo người dùng thành công",
                data: user
            });

        } catch (error) {

            console.error(
                "Lỗi tạo user:",
                error
            );

            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },


    // =====================================================
    // UPDATE USER
    // =====================================================

    async updateUser(req, res) {

        try {

            const user =
                await userService.updateUser(
                    req.params.id,
                    req.body,
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                message:
                    "Cập nhật người dùng thành công",
                data: user
            });

        } catch (error) {

            console.error(
                "Lỗi cập nhật user:",
                error
            );

            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },


    // =====================================================
    // TOGGLE STATUS
    // =====================================================

    async toggleUserStatus(req, res) {

        try {

            const user =
                await userService.toggleUserStatus(
                    req.params.id,
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                message:
                    user.status
                        ? "Mở khóa tài khoản thành công"
                        : "Khóa tài khoản thành công",
                data: user
            });

        } catch (error) {

            console.error(
                "Lỗi khóa/mở khóa user:",
                error
            );

            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },


    // =====================================================
    // DELETE USER
    // =====================================================

    async deleteUser(req, res) {

        try {

            const result =
                await userService.deleteUser(
                    req.params.id,
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                message:
                    result.message
            });

        } catch (error) {

            console.error(
                "Lỗi xóa user:",
                error
            );

            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

};

module.exports = userController;