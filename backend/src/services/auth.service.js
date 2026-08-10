const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authService = {

    async register(fullName, email, password) {

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            throw new Error("Email đã tồn tại");
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            name: fullName,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: "USER",
            status: true
        });

        return {
            id: user._id,
            fullName: user.name,
            email: user.email,
            role: user.role
        };
    },

    async login(email, password) {

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        }).select("+password");

        if (!user) {
            throw new Error(
                "Email hoặc mật khẩu không đúng"
            );
        }

        if (!user.status) {
            throw new Error(
                "Tài khoản đã bị khóa"
            );
        }

        const isPasswordValid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordValid) {
            throw new Error(
                "Email hoặc mật khẩu không đúng"
            );
        }

        const token = jwt.sign(
            {
                id: user._id.toString(),
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || "secret_key",
            {
                expiresIn: "1d"
            }
        );

        return {
            token,

            user: {
                id: user._id,
                fullName: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
};

module.exports = authService;