import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authApi from "../../api/authApi";
import { useAuth } from "../../contexts/AuthContext";

import "./Login.css";


const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (error) {
            setError("");
        }

    };


    // =========================
    // LOGIN
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // =========================
        // VALIDATE
        // =========================

        if (!formData.email.trim()) {

            setError(
                "Vui lòng nhập email."
            );

            return;
        }


        if (!formData.password) {

            setError(
                "Vui lòng nhập mật khẩu."
            );

            return;
        }


        try {

            setLoading(true);


            // =========================
            // CALL API
            // =========================

            const response =
                await authApi.login({

                    email:
                        formData.email.trim(),

                    password:
                        formData.password

                });


            console.log(
                "Login response:",
                response
            );


            // Backend:

            // {
            //     success: true,
            //     message: "...",
            //     data: {
            //         token: "...",
            //         user: {...}
            //     }
            // }


            const result =
                response.data;


            console.log(
                "Login result:",
                result
            );


            // =========================
            // CHECK SUCCESS
            // =========================

            if (!result?.success) {

                throw new Error(
                    result?.message ||
                    "Đăng nhập thất bại"
                );

            }


            // =========================
            // GET TOKEN
            // =========================

            const token =
                result?.data?.token;


            // =========================
            // GET USER
            // =========================

            const user =
                result?.data?.user;


            if (!token) {

                throw new Error(
                    "Không nhận được token từ server"
                );

            }


            if (!user) {

                throw new Error(
                    "Không nhận được thông tin người dùng"
                );

            }


            console.log(
                "Login user:",
                user
            );

            console.log(
                "Login role:",
                user.role
            );


            // =========================
            // CẬP NHẬT AUTH CONTEXT
            // =========================

            const success =
                login(
                    user,
                    token
                );


            if (!success) {

                throw new Error(
                    "Không thể lưu phiên đăng nhập"
                );

            }


            console.log(
                "Đăng nhập thành công!"
            );


            console.log(
                "Token:",
                localStorage.getItem("token")
            );


            console.log(
                "User:",
                localStorage.getItem("user")
            );


            // =========================
            // ĐIỀU HƯỚNG
            // =========================

            if (
                user.role?.toUpperCase() ===
                "ADMIN"
            ) {

                navigate(
                    "/admin",
                    {
                        replace: true
                    }
                );

            } else {

                navigate(
                    "/",
                    {
                        replace: true
                    }
                );

            }


        } catch (err) {

            console.error(
                "Login error:",
                err
            );


            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.";


            setError(message);

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // UI
    // =========================

    return (

        <div className="auth-page">

            <div className="auth-card">


                {/* LOGO */}

                <div className="auth-logo">

                    <div className="logo-box">
                        PC
                    </div>

                    <div>

                        <div className="logo-title">
                            PC STORE
                        </div>

                        <div className="logo-subtitle">
                            Computer & Technology
                        </div>

                    </div>

                </div>


                {/* TITLE */}

                <h1>
                    Đăng nhập
                </h1>


                <p className="auth-description">
                    Đăng nhập để tiếp tục mua sắm tại PC Store
                </p>


                {/* ERROR */}

                {error && (

                    <div className="auth-error">

                        {error}

                    </div>

                )}


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* EMAIL */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

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


                    {/* PASSWORD */}

                    <div className="form-group">

                        <div className="password-label">

                            <label htmlFor="password">
                                Mật khẩu
                            </label>

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


                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Đang đăng nhập..."
                            : "Đăng nhập"
                        }

                    </button>

                </form>


                {/* REGISTER */}

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