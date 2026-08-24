import axiosClient from "./axiosClient";

const brandApi = {

    // =========================
    // LẤY DANH SÁCH THƯƠNG HIỆU
    // =========================

    getBrands() {
        return axiosClient.get(
            "/brands"
        );
    },


    // =========================
    // LẤY 1 THƯƠNG HIỆU
    // =========================

    getBrandById(id) {
        return axiosClient.get(
            `/brands/${id}`
        );
    },


    // =========================
    // THÊM THƯƠNG HIỆU
    // =========================

    createBrand(data) {
        return axiosClient.post(
            "/brands",
            data
        );
    },


    // =========================
    // SỬA THƯƠNG HIỆU
    // =========================

    updateBrand(id, data) {
        return axiosClient.put(
            `/brands/${id}`,
            data
        );
    },

    // =========================
    // XÓA THƯƠNG HIỆU
    // =========================

    deleteBrand(id) {
        return axiosClient.delete(
            `/brands/${id}`
        );
    }

};

export default brandApi;