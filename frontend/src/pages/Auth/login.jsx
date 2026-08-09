import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import authApi from "../../api/authApi";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";

import "../../components/common/Toast.css";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success"
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const showToast = (message, type = "success") => {

        setToast({
            show: true,
            message,
            type
        });

        setTimeout(() => {

            setToast({
                show: false,
                message: "",
                type: "success"
            });

        }, 2500);

    };

    // QUAN TRỌNG: hàm này phải có async
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.email || !form.password) {

            showToast(
                "Vui lòng nhập email và mật khẩu",
                "error"
            );

            return;
        }

        setLoading(true);

        try {

            const response = await authApi.login(form);

            console.log(
                "LOGIN RESPONSE:",
                response.data
            );

            const { token, user } =
                response.data.data;

            console.log(
                "TOKEN:",
                token
            );

            console.log(
                "USER:",
                user
            );

            // Lưu token + user
            const success = login(
                user,
                token
            );

            if (!success) {

                showToast(
                    "Không nhận được token đăng nhập",
                    "error"
                );

                return;
            }

            showToast(
                "Đăng nhập thành công!",
                "success"
            );

            setTimeout(() => {

                navigate("/");

            }, 1000);

        } catch (error) {

            console.error(
                "Lỗi đăng nhập:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Email hoặc mật khẩu không đúng";

            showToast(
                message,
                "error"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                />
            )}

            <div className="login-card">

                <h1>Đăng nhập</h1>

                <form onSubmit={handleSubmit}>

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="Nhập email"
                        onChange={handleChange}
                    />

                    <Input
                        label="Mật khẩu"
                        type="password"
                        name="password"
                        value={form.password}
                        placeholder="Nhập mật khẩu"
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        text={
                            loading
                                ? "Đang đăng nhập..."
                                : "Đăng nhập"
                        }
                        disabled={loading}
                    />

                    <p className="forgot-password">

                        <Link to="/forgot-password">
                            Quên mật khẩu?
                        </Link>

                    </p>

                </form>

                <p>

                    Chưa có tài khoản?{" "}

                    <Link to="/register">
                        Đăng ký ngay
                    </Link>

                </p>

            </div>

        </div>

    );
};

export default Login;