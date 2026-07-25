const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authService = {
    async register(fullName, email, password) {
        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            throw new Error("Email đã tồn tại");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await User.create(
            fullName,
            email,
            hashedPassword
        );

        return {
            id: userId,
            fullName,
            email
        };
    },

    async login(email, password) {
        const user = await User.findByEmail(email);

        if (!user) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return {
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                role: user.role
            }
        };
    }
};

module.exports = authService;