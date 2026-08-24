import axiosClient from "./axiosClient";

const categoryApi = {

    // =========================
    // LẤY DANH SÁCH DANH MỤC
    // =========================
    // Gọi API backend để lấy
    // toàn bộ danh mục sản phẩm.
    // =========================

    getCategories() {

        return axiosClient.get(
            "/categories"
        );

    },


    // =========================
    // LẤY CHI TIẾT DANH MỤC
    // =========================
    // Gọi API lấy một danh mục
    // theo ID.
    // =========================

    getCategoryById(id) {

        return axiosClient.get(
            `/categories/${id}`
        );

    },


    // =========================
    // THÊM DANH MỤC
    // =========================

    createCategory(data) {

        return axiosClient.post(
            "/categories",
            data
        );

    },


    // =========================
    // CẬP NHẬT DANH MỤC
    // =========================

    updateCategory(id, data) {

        return axiosClient.put(
            `/categories/${id}`,
            data
        );

    },


    // =========================
    // XÓA DANH MỤC
    // =========================

    deleteCategory(id) {

        return axiosClient.delete(
            `/categories/${id}`
        );

    }

};

export default categoryApi;