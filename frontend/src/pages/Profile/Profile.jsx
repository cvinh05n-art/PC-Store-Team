import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useAuth } from "../../contexts/AuthContext";
import AvatarUpload from "../../components/profile/AvatarUpload";
import { updateProfile } from "../../services/userService";

const Profile = () => {

    const { user } = useAuth();

    const [formData, setFormData] = useState({

        fullName: user?.fullName || "",

        email: user?.email || "",

        phone: user?.phone || ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

        const result = await updateProfile(formData);


        console.log(result);


        alert(
            "Cập nhật thành công"
        );


    }
    catch(error){


        console.log(error);


        alert(
            "Cập nhật thất bại"
        );


        }

    };

    return (

        <>

            <Navbar />

            <div className="profile-page">

               <div className="profile-card">

                    <h2>Thông tin cá nhân</h2>


                    <AvatarUpload />


                    <form onSubmit={handleSubmit}></form>

                    <form onSubmit={handleSubmit}>

                        <Input

                            label="Họ tên"

                            name="fullName"

                            value={formData.fullName}

                            onChange={handleChange}

                        />

                        <Input

                            label="Email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                        />

                        <Input

                            label="Số điện thoại"

                            name="phone"

                            value={formData.phone}

                            onChange={handleChange}

                        />

                        <Button

                            type="submit"

                            text="Cập nhật"

                        />

                    </form>

                </div>

            </div>

        </>

    );

};

export default Profile;