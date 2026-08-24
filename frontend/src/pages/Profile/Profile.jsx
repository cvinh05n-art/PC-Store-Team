import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import AvatarUpload from "./AvatarUpload";
import { updateProfile } from "../../services/userService";
import "./Profile.css";

const Profile = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await updateProfile(formData);
            console.log(result);
            alert("Cập nhật thành công");
        } catch (error) {
            console.log(error);
            alert("Cập nhật thất bại");
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-heading">
                    <div>
                        <p className="profile-eyebrow">TÀI KHOẢN</p>
                        <h1>Thông tin cá nhân</h1>
                        <p className="profile-subtitle">
                            Quản lý thông tin tài khoản và hồ sơ của bạn.
                        </p>
                    </div>
                    <div className="profile-user-badge">PC</div>
                </div>

                <div className="profile-divider" />

                <AvatarUpload />

                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="profile-form-grid">
                        <div className="profile-field">
                            <Input
                                label="Họ tên"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="profile-field">
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="profile-field profile-field-full">
                            <Input
                                label="Số điện thoại"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                    </div>

                    <div className="profile-form-footer">
                        <p>Thông tin sẽ được cập nhật vào tài khoản của bạn.</p>
                        <div className="profile-submit">
                            <Button type="submit" text="Lưu thay đổi" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
