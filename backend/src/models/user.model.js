const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // =========================
        // THÔNG TIN USER
        // =========================

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false
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

module.exports = mongoose.model(
    "User",
    userSchema
);