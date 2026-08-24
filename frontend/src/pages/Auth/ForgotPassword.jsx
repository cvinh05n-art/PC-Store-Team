import React, { useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../../api/authApi";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }

    try {
      setLoading(true);

      const response = await authApi.forgotPassword({
        email: email.trim(),
      });

      console.log("Forgot password response:", response);

      const data = response?.data || response;

      setSuccess(
        data?.message ||
          "Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư."
      );
    } catch (err) {
      console.error("Forgot password error:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Không thể gửi mã OTP. Vui lòng kiểm tra lại email.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        {/* LOGO */}
        <div className="forgot-logo">
          <div className="forgot-logo-box">
            PC
          </div>

          <div>
            <div className="forgot-logo-title">
              PC STORE
            </div>

            <div className="forgot-logo-subtitle">
              Computer & Technology
            </div>
          </div>
        </div>

        {/* TITLE */}
        <h1>Quên mật khẩu</h1>

        <p className="forgot-description">
          Nhập email của bạn để nhận mã OTP
          <br />
          và khôi phục mật khẩu.
        </p>

        {/* ERROR */}
        {error && (
          <div className="forgot-error">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="forgot-success">
            {success}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="forgot-form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (error) {
                  setError("");
                }

                if (success) {
                  setSuccess("");
                }
              }}
              placeholder="Nhập email"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="forgot-button"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi mã OTP"}
          </button>
        </form>

        {/* BACK LOGIN */}
        <div className="back-login">
          <Link to="/login">
            ← Quay lại đăng nhập
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;