const authService = require("../services/auth.service");

const authController = {

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
    }

};

module.exports = authController;