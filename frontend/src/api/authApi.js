import axiosClient from "./axiosClient";

const authApi = {

  // =========================
  // LOGIN
  // =========================

  login(data) {
    return axiosClient.post(
      "/auth/login",
      data
    );
  },


  // =========================
  // REGISTER
  // =========================

  register(data) {
    return axiosClient.post(
      "/auth/register",
      data
    );
  },


  // =========================
  // FORGOT PASSWORD
  // =========================

  forgotPassword(data) {
    return axiosClient.post(
      "/auth/forgot-password",
      data
    );
  },


  // =========================
  // VERIFY OTP
  // =========================

  verifyOtp(data) {
    return axiosClient.post(
      "/auth/verify-otp",
      data
    );
  },


  // =========================
  // RESET PASSWORD
  // =========================

  resetPassword(data) {
    return axiosClient.post(
      "/auth/reset-password",
      data
    );
  },


  // =========================
  // PROFILE
  // =========================

  getProfile() {
    return axiosClient.get(
      "/auth/profile"
    );
  },


  // =========================
  // LOGOUT
  // =========================

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },


  // =========================
  // KIỂM TRA LOGIN
  // =========================

  isLoggedIn() {
    return !!localStorage.getItem("token");
  },


  // =========================
  // LẤY USER
  // =========================

  getCurrentUser() {

    const user =
      localStorage.getItem("user");

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch (error) {

      console.error(
        "Lỗi đọc user:",
        error
      );

      return null;
    }
  }

};

export default authApi;