import axiosClient from "./axiosClient";

const userApi = {
    // Lấy danh sách user cho Admin
    getUsers(search = "") {
        return axiosClient.get("/users", { params: { search } });
    },

    // Tạo user
    createUser(data) {
        return axiosClient.post("/users", data);
    },

    // Sửa user
    updateUser(id, data) {
        return axiosClient.put(`/users/${id}`, data);
    },

    // Khóa/mở khóa user
    toggleUserStatus(id) {
        return axiosClient.patch(`/users/${id}/status`);
    },

    // Xóa user
    deleteUser(id) {
        return axiosClient.delete(`/users/${id}`);
    },

    // Lấy profile hiện tại
    getProfile() {
        return axiosClient.get("/auth/profile");
    },

    // Cập nhật profile
    updateProfile(data) {
        return axiosClient.put("/auth/profile", data);
    },

    // Đổi mật khẩu
    changePassword(data) {
        return axiosClient.put("/auth/change-password", data);
    }
};

export default userApi;
