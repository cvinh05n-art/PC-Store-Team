import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../api/authApi";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      };

      await authApi.register(payload);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordToggle = (visible, setVisible, label) => (
    <button
      type="button"
      className="password-toggle"
      onClick={() => setVisible((value) => !value)}
      aria-label={label}
      title={label}
    >
      {visible ? "◉" : "◌"}
    </button>
  );

  return (
    <section className="register-page">
      <div className="register-shell">
        <aside className="register-intro">
          <div className="register-logo">PC</div>
          <h2>Chào mừng đến PC STORE</h2>
          <p>
            Tạo tài khoản để mua sắm linh kiện máy tính nhanh chóng,
            theo dõi đơn hàng và quản lý thông tin cá nhân dễ dàng.
          </p>

          <ul className="register-benefits">
            <li>
              <span className="check">✓</span>
              <span>Theo dõi đơn hàng và lịch sử mua sắm.</span>
            </li>
            <li>
              <span className="check">✓</span>
              <span>Lưu giỏ hàng và thông tin giao hàng.</span>
            </li>
            <li>
              <span className="check">✓</span>
              <span>Trải nghiệm mua linh kiện thuận tiện hơn.</span>
            </li>
          </ul>
        </aside>

        <div className="register-form-area">
          <div className="register-heading">
            <h1>Tạo tài khoản</h1>
            <p>Điền thông tin bên dưới để bắt đầu mua sắm.</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-field">
              <label htmlFor="register-fullName">Họ và tên</label>
              <div className="register-input-wrap">
                <span className="field-icon">👤</span>
                <input
                  id="register-fullName"
                  type="text"
                  name="fullName"
                  placeholder="Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-email">Email</label>
              <div className="register-input-wrap">
                <span className="field-icon">✉</span>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-phone">Số điện thoại</label>
              <div className="register-input-wrap">
                <span className="field-icon">☎</span>
                <input
                  id="register-phone"
                  type="tel"
                  name="phone"
                  placeholder="0123 456 789"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-password">Mật khẩu</label>
              <div className="register-input-wrap">
                <span className="field-icon">🔒</span>
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Tối thiểu 6 ký tự"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                {renderPasswordToggle(showPassword, setShowPassword, "Hiện/ẩn mật khẩu")}
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-confirmPassword">Xác nhận mật khẩu</label>
              <div className="register-input-wrap">
                <span className="field-icon">🔐</span>
                <input
                  id="register-confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                {renderPasswordToggle(
                  showConfirmPassword,
                  setShowConfirmPassword,
                  "Hiện/ẩn mật khẩu xác nhận"
                )}
              </div>
            </div>

            {errorMessage && (
              <div className="register-error" role="alert">
                {errorMessage}
              </div>
            )}

            <button className="register-submit" type="submit" disabled={loading}>
              {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
            </button>
          </form>

          <p className="register-login">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>

          <p className="register-note">
            Bằng việc đăng ký, bạn đồng ý với các chính sách của PC STORE.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
