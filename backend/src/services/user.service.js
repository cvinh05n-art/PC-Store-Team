const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const userService = {

    // =====================================================
    // LẤY DANH SÁCH USER
    // =====================================================

    async getUsers(search = "") {

        const keyword = search.trim();

        const filter = keyword
            ? {
                $or: [
                    {
                        name: {
                            $regex: keyword,
                            $options: "i"
                        }
                    },
                    {
                        email: {
                            $regex: keyword,
                            $options: "i"
                        }
                    }
                ]
            }
            : {};

        const users = await User.find(filter)
            .select(
                "_id name email role status createdAt updatedAt"
            )
            .sort({
                createdAt: -1
            });

        return users.map((user) => ({
            id: user._id,
            name: user.name,
            fullName: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));
    },


    // =====================================================
    // TẠO USER
    // =====================================================

    async createUser(
        name,
        email,
        password,
        role = "USER"
    ) {

        const normalizedEmail =
            email.toLowerCase().trim();

        const normalizedRole =
            String(role).toUpperCase() === "ADMIN"
                ? "ADMIN"
                : "USER";

        const existingUser =
            await User.findOne({
                email: normalizedEmail
            });

        if (existingUser) {
            throw new Error(
                "Email đã tồn tại"
            );
        }

        if (!password || password.length < 6) {
            throw new Error(
                "Mật khẩu phải có ít nhất 6 ký tự"
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: normalizedRole,
            status: true
        });

        return {
            id: user._id,
            name: user.name,
            fullName: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        };
    },


    // =====================================================
    // CẬP NHẬT PROFILE
    // =====================================================
    // USER và ADMIN đều có thể sử dụng.
    //
    // Không nhận ID từ URL.
    // ID lấy từ token đăng nhập thông qua req.user.id.
    //
    // Các thông tin được phép cập nhật:
    // - name
    // - phone
    // - address
    // - avatar
    //
    // Không cho sửa:
    // - role
    // - status
    // - password
    //
    // Mục đích là tránh việc người dùng tự nâng quyền
    // ADMIN hoặc tự thay đổi trạng thái tài khoản.
    // =====================================================

    async updateProfile(
        id,
        data
    ) {

        // Tìm đúng tài khoản đang đăng nhập
        const user =
            await User.findById(id);

        if (!user) {

            throw new Error(
                "Không tìm thấy người dùng"
            );

        }


        // ---------------------------------------------
        // CẬP NHẬT HỌ TÊN
        // ---------------------------------------------

        if (data.name !== undefined) {

            const name =
                String(data.name).trim();

            if (!name) {

                throw new Error(
                    "Họ tên không được để trống"
                );

            }

            user.name = name;
        }


        // ---------------------------------------------
        // CẬP NHẬT SỐ ĐIỆN THOẠI
        // ---------------------------------------------

        if (data.phone !== undefined) {

            user.phone =
                String(data.phone).trim();

        }


        // ---------------------------------------------
        // CẬP NHẬT ĐỊA CHỈ
        // ---------------------------------------------

        if (data.address !== undefined) {

            user.address =
                String(data.address).trim();

        }


        // ---------------------------------------------
        // CẬP NHẬT AVATAR
        // ---------------------------------------------

        if (data.avatar !== undefined) {

            user.avatar =
                data.avatar;

        }


        // Lưu thay đổi xuống MongoDB
        await user.save();


        // Không trả password về Frontend
        return {
            id: user._id,
            name: user.name,
            fullName: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            phone: user.phone,
            address: user.address,
            avatar: user.avatar
        };
    },


    // =====================================================
    // CẬP NHẬT USER
    // =====================================================
    // Chức năng này dành cho ADMIN.
    // ADMIN có thể sửa thông tin tài khoản khác.
    // =====================================================

    async updateUser(
        id,
        data,
        currentUserId
    ) {

        const user =
            await User.findById(id)
                .select("+password");

        if (!user) {
            throw new Error(
                "Không tìm thấy người dùng"
            );
        }

        // Không cho admin tự khóa tài khoản
        if (
            String(id) === String(currentUserId) &&
            data.status === false
        ) {
            throw new Error(
                "Bạn không thể tự khóa tài khoản của mình"
            );
        }

        // Không cho admin tự hạ quyền chính mình
        if (
            String(id) === String(currentUserId) &&
            data.role &&
            String(data.role).toUpperCase() !== "ADMIN"
        ) {
            throw new Error(
                "Bạn không thể tự hạ quyền Admin của mình"
            );
        }

        if (data.name !== undefined) {

            user.name =
                data.name.trim();

        }

        if (data.email !== undefined) {

            const normalizedEmail =
                data.email.toLowerCase().trim();

            const duplicate =
                await User.findOne({
                    email: normalizedEmail,
                    _id: {
                        $ne: id
                    }
                });

            if (duplicate) {
                throw new Error(
                    "Email đã tồn tại"
                );
            }

            user.email =
                normalizedEmail;
        }

        if (data.role !== undefined) {

            user.role =
                String(data.role).toUpperCase() === "ADMIN"
                    ? "ADMIN"
                    : "USER";
        }

        if (data.status !== undefined) {

            user.status =
                Boolean(data.status);

        }

        if (
            data.password &&
            data.password.trim()
        ) {

            if (data.password.length < 6) {

                throw new Error(
                    "Mật khẩu phải có ít nhất 6 ký tự"
                );

            }

            user.password =
                await bcrypt.hash(
                    data.password,
                    10
                );
        }

        await user.save();

        return {
            id: user._id,
            name: user.name,
            fullName: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        };
    },


    // =====================================================
    // KHÓA / MỞ KHÓA
    // =====================================================

    async toggleUserStatus(
        id,
        currentUserId
    ) {

        const user =
            await User.findById(id);

        if (!user) {
            throw new Error(
                "Không tìm thấy người dùng"
            );
        }

        if (
            String(id) === String(currentUserId)
        ) {
            throw new Error(
                "Bạn không thể tự khóa tài khoản của mình"
            );
        }

        user.status = !user.status;

        await user.save();

        return {
            id: user._id,
            name: user.name,
            fullName: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        };
    },


    // =====================================================
    // XÓA USER
    // =====================================================

    async deleteUser(
        id,
        currentUserId
    ) {

        if (
            String(id) === String(currentUserId)
        ) {
            throw new Error(
                "Bạn không thể tự xóa tài khoản của mình"
            );
        }

        const user =
            await User.findById(id);

        if (!user) {
            throw new Error(
                "Không tìm thấy người dùng"
            );
        }

        await User.findByIdAndDelete(id);

        return {
            id,
            message:
                "Xóa người dùng thành công"
        };
    }

};

module.exports = userService;