import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./Auth.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    };
    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Quên mật khẩu</h2>
                <p>
                    Nhập email để nhận mã OTP
                </p>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        text="Gửi mã OTP"
                    />
                </form>
                <Link to="/login">
                    Quay lại đăng nhập
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;