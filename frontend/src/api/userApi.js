import axiosClient from "./axiosClient";

const userApi = {

    getUsers(search = "") {

        return axiosClient.get(
            "/users",
            {
                params: {
                    search
                }
            }
        );
    },


    createUser(data) {

        return axiosClient.post(
            "/users",
            data
        );
    },


    updateUser(id, data) {

        return axiosClient.put(
            `/users/${id}`,
            data
        );
    },


    toggleUserStatus(id) {

        return axiosClient.patch(
            `/users/${id}/status`
        );
    },


    deleteUser(id) {

        return axiosClient.delete(
            `/users/${id}`
        );
    },


    getProfile() {

        return axiosClient.get(
            "/auth/profile"
        );
    },


    updateProfile(data) {

        return axiosClient.put(
            "/auth/profile",
            data
        );
    },


    uploadAvatar(data) {

        return axiosClient.post(
            "/users/avatar",
            data,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data"
                }
            }
        );
    }

};

export default userApi;