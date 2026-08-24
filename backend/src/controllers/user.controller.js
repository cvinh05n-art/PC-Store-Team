const userService =
    require("../services/user.service");

const userController = {

    // =========================
    // GET USERS
    // =========================

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


    // =========================
    // CREATE USER
    // =========================

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


    // =========================
    // UPDATE USER
    // =========================

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


    // =========================
    // TOGGLE STATUS
    // =========================

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


    // =========================
    // DELETE USER
    // =========================

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