import axiosClient from "./axiosClient";

const authApi = {
  login(data) {
    return axiosClient.post(
      "/auth/login",
      data
    );
  },

  register(data) {
    return axiosClient.post(
      "/auth/register",
      data
    );
  },

  forgotPassword(data) {
    return axiosClient.post(
      "/auth/forgot-password",
      data
    );
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default authApi;