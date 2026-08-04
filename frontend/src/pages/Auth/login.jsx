import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import authApi from "../../api/authApi";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import "../../components/common/Toast.css";

const Login = () => {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await authApi.login(formData);

            const { user, token } = response.data;

            login(user, token);

            alert("Đăng nhập thành công");

            navigate("/");

        }
        catch (error) {

            console.log(error);

            alert("Đăng nhập thất bại");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Đăng nhập</h1>

                <form onSubmit={handleSubmit}>

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

                    <Button
                        type="submit"
                        text="Đăng nhập"
                        loading={loading}
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