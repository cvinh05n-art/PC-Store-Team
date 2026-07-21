import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/auth.service";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import authService from '../../services/auth.service';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';

import '../../components/common/Toast.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await authService.login(formData);

      const { login } = useAuth();

      if (res.user) {
        login(res.user, res.token);
      }

      alert("Đăng nhập thành công");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Đăng nhập</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Nhập email"
                onChange={handleChange}
            />

            <Input
                label="Mật khẩu"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Nhập mật khẩu"
                onChange={handleChange}
            />

          </div>

          <Button
                type="submit"
                text="Đăng nhập"
                loading={loading}
            />
          <p className="forgot-password">

            <Link to="/forgot-password">Quên mật khẩu?</Link>

          </p>
          
        </form>

        <p>
          Chưa có tài khoản?{" "}
          <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;