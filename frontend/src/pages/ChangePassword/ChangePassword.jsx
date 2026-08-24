import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const ChangePassword = () => {

    const [formData, setFormData] = useState({

        oldPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(formData.newPassword !== formData.confirmPassword){

            alert("Mật khẩu xác nhận không khớp");

            return;

        }

        setLoading(true);

        console.log(formData);

        setTimeout(()=>{

            alert("Đổi mật khẩu thành công");

            setLoading(false);

        },1000);

    };

    return (

        <>

            <Navbar />

            <div className="profile-page">

                <div className="profile-card">

                    <h2>Đổi mật khẩu</h2>

                    <form onSubmit={handleSubmit}>

                        <Input
                            label="Mật khẩu cũ"
                            type="password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                        />

                        <Input
                            label="Mật khẩu mới"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />

                        <Input
                            label="Xác nhận mật khẩu"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        <Button
                            type="submit"
                            text="Đổi mật khẩu"
                            loading={loading}
                        />

                    </form>

                </div>

            </div>

        </>

    );

};

export default ChangePassword;