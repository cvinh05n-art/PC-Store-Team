const authService = require("../services/auth.service");

const authController = {

    // =========================
    // REGISTER
    // =========================

    async register(req, res) {

        try {

            const {
                fullName,
                email,
                password
            } = req.body;

            if (!fullName || !email || !password) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Vui lòng nhập đầy đủ thông tin"
                });

            }

            const user =
                await authService.register(
                    fullName,
                    email,
                    password
                );

            return res.status(201).json({

                success: true,

                message:
                    "Đăng ký thành công",

                data: user

            });

        } catch (error) {

            console.error(
                "Lỗi đăng ký:",
                error
            );

            return res.status(400).json({

                success: false,

                message: error.message

            });

        }
    },


    // =========================
    // LOGIN
    // =========================

    async login(req, res) {

        try {

            const {
                email,
                password
            } = req.body;

            if (!email || !password) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Vui lòng nhập email và mật khẩu"

                });

            }

            const data =
                await authService.login(
                    email,
                    password
                );

            return res.status(200).json({

                success: true,

                message:
                    "Đăng nhập thành công",

                data

            });

        } catch (error) {

            console.error(
                "Lỗi đăng nhập:",
                error
            );

            return res.status(401).json({

                success: false,

                message: error.message

            });

        }
    },


    // =========================
    // FORGOT PASSWORD
    // =========================

    async forgotPassword(req, res) {

        try {

            const {
                email
            } = req.body;

            if (!email) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Vui lòng nhập email"

                });

            }

            const result =
                await authService.forgotPassword(
                    email
                );

            return res.status(200).json({

                success: true,

                message: result.message

            });

        } catch (error) {

            console.error(
                "Lỗi quên mật khẩu:",
                error
            );

            return res.status(400).json({

                success: false,

                message: error.message

            });

        }
    },


    // =========================
    // VERIFY OTP
    // =========================

    async verifyOtp(req, res) {

        try {

            const {
                email,
                otp
            } = req.body;

            if (!email || !otp) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Vui lòng nhập email và mã OTP"

                });

            }

            const result =
                await authService.verifyOtp(
                    email,
                    otp
                );

            return res.status(200).json({

                success: true,

                message: result.message

            });

        } catch (error) {

            console.error(
                "Lỗi xác thực OTP:",
                error
            );

            return res.status(400).json({

                success: false,

                message: error.message

            });

        }
    },


    // =========================
    // RESET PASSWORD
    // =========================

    async resetPassword(req, res) {

        try {

            const {
                email,
                otp,
                newPassword
            } = req.body;

            if (
                !email ||
                !otp ||
                !newPassword
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Vui lòng nhập đầy đủ thông tin"

                });

            }

            const result =
                await authService.resetPassword(
                    email,
                    otp,
                    newPassword
                );

            return res.status(200).json({

                success: true,

                message: result.message

            });

        } catch (error) {

            console.error(
                "Lỗi đặt lại mật khẩu:",
                error
            );

            return res.status(400).json({

                success: false,

                message: error.message

            });

        }
    },


    // =========================
    // CẬP NHẬT PROFILE
    // =========================

    async updateProfile(req, res) {
        try {
            const user = await authService.updateProfile(req.user.id, req.body);
            return res.status(200).json({ success: true, message: "Cập nhật hồ sơ thành công", data: user });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    },

    // =========================
    // ĐỔI MẬT KHẨU
    // =========================

    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body;
            if (!oldPassword || !newPassword || !confirmPassword) {
                return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin" });
            }
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ success: false, message: "Mật khẩu xác nhận không khớp" });
            }
            const result = await authService.changePassword(req.user.id, oldPassword, newPassword);
            return res.status(200).json({ success: true, message: result.message });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    },

};

module.exports = authController;