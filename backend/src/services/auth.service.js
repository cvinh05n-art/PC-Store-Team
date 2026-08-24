const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const transporter = require("../config/mail");

const authService = {

    // =========================
    // REGISTER
    // =========================

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


    // =========================
    // LOGIN
    // =========================

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
    },


    // =========================
    // FORGOT PASSWORD
    // =========================

    async forgotPassword(email) {

        const normalizedEmail =
            email.toLowerCase().trim();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            throw new Error(
                "Email không tồn tại trong hệ thống"
            );
        }

        if (!user.status) {
            throw new Error(
                "Tài khoản đã bị khóa"
            );
        }

        // Tạo OTP 6 số
        const otp =
            Math.floor(
                100000 + Math.random() * 900000
            ).toString();

        // OTP có hiệu lực 5 phút
        const otpExpires =
            new Date(Date.now() + 5 * 60 * 1000);

        user.resetOtp = otp;
        user.resetOtpExpires = otpExpires;

        await user.save();

        // Nội dung email
        const mailOptions = {

            from: `"PC Store Team" <${process.env.MAIL_USER}>`,

            to: user.email,

            subject: "PC Store - Mã OTP đặt lại mật khẩu",

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 30px;
                    background: #f5f7fb;
                ">

                    <div style="
                        background: white;
                        padding: 35px;
                        border-radius: 15px;
                        text-align: center;
                    ">

                        <h1 style="
                            color: #2563eb;
                            margin-bottom: 10px;
                        ">
                            PC STORE
                        </h1>

                        <p style="
                            color: #64748b;
                            font-size: 15px;
                        ">
                            Yêu cầu đặt lại mật khẩu
                        </p>

                        <p>
                            Xin chào <strong>${user.name}</strong>,
                        </p>

                        <p>
                            Mã OTP của bạn là:
                        </p>

                        <div style="
                            display: inline-block;
                            padding: 15px 30px;
                            margin: 15px 0;
                            background: #eff6ff;
                            color: #2563eb;
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 8px;
                            border-radius: 10px;
                        ">
                            ${otp}
                        </div>

                        <p style="
                            color: #64748b;
                            font-size: 14px;
                        ">
                            Mã OTP có hiệu lực trong
                            <strong>5 phút</strong>.
                        </p>

                        <p style="
                            color: #94a3b8;
                            font-size: 13px;
                        ">
                            Nếu bạn không yêu cầu đặt lại
                            mật khẩu, hãy bỏ qua email này.
                        </p>

                    </div>

                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return {
            message:
                "Mã OTP đã được gửi đến email của bạn"
        };
    },


    // =========================
    // VERIFY OTP
    // =========================

    async verifyOtp(email, otp) {

        const normalizedEmail =
            email.toLowerCase().trim();

        const user = await User.findOne({
            email: normalizedEmail
        }).select(
            "+resetOtp +resetOtpExpires"
        );

        if (!user) {
            throw new Error(
                "Email không tồn tại"
            );
        }

        if (!user.resetOtp) {
            throw new Error(
                "Không tìm thấy mã OTP"
            );
        }

        if (
            !user.resetOtpExpires ||
            user.resetOtpExpires < new Date()
        ) {

            user.resetOtp = null;
            user.resetOtpExpires = null;

            await user.save();

            throw new Error(
                "Mã OTP đã hết hạn"
            );
        }

        if (user.resetOtp !== otp.trim()) {
            throw new Error(
                "Mã OTP không chính xác"
            );
        }

        return {
            message:
                "Xác thực OTP thành công"
        };
    },


    // =========================
    // RESET PASSWORD
    // =========================

    async resetPassword(
        email,
        otp,
        newPassword
    ) {

        const normalizedEmail =
            email.toLowerCase().trim();

        const user = await User.findOne({
            email: normalizedEmail
        }).select(
            "+password +resetOtp +resetOtpExpires"
        );

        if (!user) {
            throw new Error(
                "Email không tồn tại"
            );
        }

        if (!user.resetOtp) {
            throw new Error(
                "Không tìm thấy mã OTP"
            );
        }

        if (
            !user.resetOtpExpires ||
            user.resetOtpExpires < new Date()
        ) {

            user.resetOtp = null;
            user.resetOtpExpires = null;

            await user.save();

            throw new Error(
                "Mã OTP đã hết hạn"
            );
        }

        if (user.resetOtp !== otp.trim()) {
            throw new Error(
                "Mã OTP không chính xác"
            );
        }

        if (!newPassword || newPassword.length < 6) {
            throw new Error(
                "Mật khẩu mới phải có ít nhất 6 ký tự"
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        user.password = hashedPassword;

        // Xóa OTP sau khi đổi mật khẩu
        user.resetOtp = null;
        user.resetOtpExpires = null;

        await user.save();

        return {
            message:
                "Đặt lại mật khẩu thành công"
        };
    },


    // =========================
    // CẬP NHẬT HỒ SƠ
    // =========================

    async updateProfile(userId, data) {
        const user = await User.findById(userId);
        if (!user) throw new Error("Không tìm thấy tài khoản");

        if (data.fullName !== undefined) user.name = data.fullName.trim();
        if (data.email !== undefined) {
            const email = data.email.toLowerCase().trim();
            const duplicate = await User.findOne({ email, _id: { $ne: userId } });
            if (duplicate) throw new Error("Email đã tồn tại");
            user.email = email;
        }
        if (data.phone !== undefined) user.phone = data.phone.trim();
        if (data.avatar !== undefined) user.avatar = data.avatar;

        await user.save();
        return {
            id: user._id,
            fullName: user.name,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            role: user.role
        };
    },

    // =========================
    // ĐỔI MẬT KHẨU KHI ĐÃ ĐĂNG NHẬP
    // =========================

    async changePassword(userId, oldPassword, newPassword) {
        const user = await User.findById(userId).select("+password");
        if (!user) throw new Error("Không tìm thấy tài khoản");

        const valid = await bcrypt.compare(oldPassword, user.password);
        if (!valid) throw new Error("Mật khẩu cũ không đúng");

        if (!newPassword || newPassword.length < 6) {
            throw new Error("Mật khẩu mới phải có ít nhất 6 ký tự");
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return { message: "Đổi mật khẩu thành công" };
    },

};

module.exports = authService;