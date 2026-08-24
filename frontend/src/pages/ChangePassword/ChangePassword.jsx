import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import userApi from "../../api/userApi";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Gọi API đổi mật khẩu thật
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp");
            return;
        }

        try {
            setLoading(true);
            const response = await userApi.changePassword(formData);
            alert(response.data?.message || "Đổi mật khẩu thành công");
            setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            alert(error?.response?.data?.message || "Đổi mật khẩu thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h2>Đổi mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <Input label="Mật khẩu cũ" type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
                    <Input label="Mật khẩu mới" type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                    <Input label="Xác nhận mật khẩu" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    <Button type="submit" text="Đổi mật khẩu" loading={loading} />
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
