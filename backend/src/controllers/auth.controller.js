const authService = require("../services/auth.service");

const authController = {
    async register(req, res) {
        try {
            const { fullName, email, password } = req.body;

            if (!fullName || !email || !password) {
                return res.status(400).json({
                    message: "Vui lòng nhập đầy đủ thông tin"
                });
            }

            const user = await authService.register(
                fullName,
                email,
                password
            );

            res.status(201).json({
                message: "Đăng ký thành công",
                data: user
            });

        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Vui lòng nhập email và mật khẩu"
                });
            }

            const user = await authService.login(email, password);

            res.status(200).json({
                message: "Đăng nhập thành công",
                data: user
            });

        } catch (error) {
            res.status(401).json({
                message: error.message
            });
        }
    }
};

module.exports = authController;