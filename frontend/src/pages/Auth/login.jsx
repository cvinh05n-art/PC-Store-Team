import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }

    if (!formData.password) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }

    try {
      setLoading(true);

      const response = await authApi.login({
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Login response:", response);

      // Tùy cấu trúc response của backend
      const data = response?.data || response;

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      if (data?.accessToken) {
        localStorage.setItem("token", data.accessToken);
      }

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Nếu backend trả user bên trong data.data
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      if (data?.data?.user) {
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-box">PC</div>

          <div>
            <div className="logo-title">PC STORE</div>
            <div className="logo-subtitle">
              Computer & Technology
            </div>
          </div>
        </div>

        <h1>Đăng nhập</h1>

        <p className="auth-description">
          Đăng nhập để tiếp tục mua sắm tại PC Store
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <div className="password-label">
              <label htmlFor="password">Mật khẩu</label>

              <Link to="/forgot-password">
                Quên mật khẩu?
              </Link>
            </div>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="register-text">
          Chưa có tài khoản?{" "}
          <Link to="/register">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;