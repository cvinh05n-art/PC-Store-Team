import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import "./ForgotPassword.css";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================
    // GỬI OTP
    // =========================

    const handleSendOtp = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Vui lòng nhập email");
            return;
        }

        try {

            setLoading(true);

            const response =
                await authApi.forgotPassword({
                    email: email.trim()
                });

            if (response.data?.success) {

                setSuccess(
                    "Mã OTP đã được gửi đến email của bạn"
                );

                setStep(2);

            } else {

                setError(
                    response.data?.message ||
                    "Không thể gửi mã OTP"
                );
            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Có lỗi xảy ra khi gửi OTP"
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // VERIFY OTP
    // =========================

    const handleVerifyOtp = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!otp.trim()) {
            setError("Vui lòng nhập mã OTP");
            return;
        }

        if (otp.length !== 6) {
            setError("Mã OTP phải có 6 chữ số");
            return;
        }

        try {

            setLoading(true);

            const response =
                await authApi.verifyOtp({
                    email: email.trim(),
                    otp: otp.trim()
                });

            if (response.data?.success) {

                setSuccess(
                    "Xác thực OTP thành công"
                );

                setStep(3);

            } else {

                setError(
                    response.data?.message ||
                    "Mã OTP không chính xác"
                );
            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Mã OTP không chính xác"
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // RESET PASSWORD
    // =========================

    const handleResetPassword = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!newPassword) {
            setError("Vui lòng nhập mật khẩu mới");
            return;
        }

        if (newPassword.length < 6) {
            setError(
                "Mật khẩu phải có ít nhất 6 ký tự"
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(
                "Mật khẩu xác nhận không khớp"
            );
            return;
        }

        try {

            setLoading(true);

            const response =
                await authApi.resetPassword({
                    email: email.trim(),
                    otp: otp.trim(),
                    newPassword
                });

            if (response.data?.success) {

                setSuccess(
                    "Đặt lại mật khẩu thành công!"
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1500);

            } else {

                setError(
                    response.data?.message ||
                    "Không thể đặt lại mật khẩu"
                );
            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Có lỗi xảy ra khi đặt lại mật khẩu"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="forgot-page">

            <div className="forgot-card">

                {/* LOGO */}

                <div className="forgot-logo">
                    <div className="forgot-logo-icon">
                        🛒
                    </div>

                    <h1>
                        PC STORE
                    </h1>

                    <p>
                        Khôi phục tài khoản
                    </p>
                </div>


                {/* PROGRESS */}

                <div className="forgot-progress">

                    <div
                        className={`progress-step ${
                            step >= 1 ? "active" : ""
                        }`}
                    >
                        <span>1</span>
                        <small>Email</small>
                    </div>

                    <div
                        className={`progress-line ${
                            step >= 2 ? "active" : ""
                        }`}
                    />

                    <div
                        className={`progress-step ${
                            step >= 2 ? "active" : ""
                        }`}
                    >
                        <span>2</span>
                        <small>OTP</small>
                    </div>

                    <div
                        className={`progress-line ${
                            step >= 3 ? "active" : ""
                        }`}
                    />

                    <div
                        className={`progress-step ${
                            step >= 3 ? "active" : ""
                        }`}
                    >
                        <span>3</span>
                        <small>Mật khẩu</small>
                    </div>

                </div>


                {/* ERROR */}

                {error && (
                    <div className="forgot-message error">
                        ⚠️ {error}
                    </div>
                )}


                {/* SUCCESS */}

                {success && (
                    <div className="forgot-message success">
                        ✓ {success}
                    </div>
                )}


                {/* ========================= */}
                {/* STEP 1 */}
                {/* ========================= */}

                {step === 1 && (

                    <form onSubmit={handleSendOtp}>

                        <div className="forgot-title">

                            <h2>
                                Quên mật khẩu?
                            </h2>

                            <p>
                                Nhập email của bạn để nhận
                                mã OTP khôi phục tài khoản.
                            </p>

                        </div>


                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <div className="input-box">

                                <span>
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                            </div>

                        </div>


                        <button
                            className="forgot-btn"
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Đang gửi..."
                                : "Gửi mã OTP →"
                            }

                        </button>

                    </form>

                )}


                {/* ========================= */}
                {/* STEP 2 */}
                {/* ========================= */}

                {step === 2 && (

                    <form onSubmit={handleVerifyOtp}>

                        <div className="forgot-title">

                            <h2>
                                Xác thực OTP
                            </h2>

                            <p>
                                Mã OTP đã được gửi đến
                            </p>

                            <strong>
                                {email}
                            </strong>

                        </div>


                        <div className="form-group">

                            <label>
                                Mã OTP
                            </label>

                            <div className="input-box otp-box">

                                <span>
                                    🔐
                                </span>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="6"
                                    placeholder="Nhập 6 chữ số"
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(
                                            e.target.value
                                                .replace(/\D/g, "")
                                        )
                                    }
                                />

                            </div>

                        </div>


                        <button
                            className="forgot-btn"
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Đang xác thực..."
                                : "Xác nhận OTP →"
                            }

                        </button>


                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => {
                                setStep(1);
                                setOtp("");
                                setError("");
                                setSuccess("");
                            }}
                        >
                            ← Đổi email
                        </button>

                    </form>

                )}


                {/* ========================= */}
                {/* STEP 3 */}
                {/* ========================= */}

                {step === 3 && (

                    <form onSubmit={handleResetPassword}>

                        <div className="forgot-title">

                            <h2>
                                Tạo mật khẩu mới
                            </h2>

                            <p>
                                Nhập mật khẩu mới cho tài khoản
                            </p>

                            <strong>
                                {email}
                            </strong>

                        </div>


                        <div className="form-group">

                            <label>
                                Mật khẩu mới
                            </label>

                            <div className="input-box">

                                <span>
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    placeholder="Ít nhất 6 ký tự"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label>
                                Xác nhận mật khẩu
                            </label>

                            <div className="input-box">

                                <span>
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        <button
                            className="forgot-btn"
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Đang cập nhật..."
                                : "Đổi mật khẩu ✓"
                            }

                        </button>

                    </form>

                )}


                {/* LOGIN */}

                <div className="forgot-footer">

                    <span>
                        Nhớ mật khẩu rồi?
                    </span>

                    <Link to="/login">
                        Đăng nhập
                    </Link>

                </div>

            </div>

        </div>

    );
};

export default ForgotPassword;