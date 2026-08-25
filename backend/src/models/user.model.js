const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // =========================
        // THÔNG TIN USER
        // =========================

        // Họ và tên
        name: {
            type: String,
            required: true,
            trim: true
        },

        // Email đăng nhập
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        // Mật khẩu đã được mã hóa
        password: {
            type: String,
            required: true,
            select: false
        },

        // =========================
        // THÔNG TIN PROFILE
        // =========================

        // Số điện thoại
        phone: {
            type: String,
            default: "",
            trim: true
        },

        // Địa chỉ
        address: {
            type: String,
            default: "",
            trim: true
        },

        // Ảnh đại diện
        avatar: {
            type: String,
            default: ""
        },

        // =========================
        // ROLE
        // =========================

        role: {
            type: String,
            enum: [
                "user",
                "admin",
                "USER",
                "ADMIN"
            ],
            default: "USER"
        },

        // =========================
        // TRẠNG THÁI TÀI KHOẢN
        // =========================

        status: {
            type: Boolean,
            default: true
        },

        // =========================
        // QUÊN MẬT KHẨU - OTP
        // =========================

        resetOtp: {
            type: String,
            default: null,
            select: false
        },

        resetOtpExpires: {
            type: Date,
            default: null,
            select: false
        }
    },

    {
        timestamps: true
    }
);


// =========================
// EXPORT MODEL
// =========================

module.exports = mongoose.model(
    "User",
    userSchema
);