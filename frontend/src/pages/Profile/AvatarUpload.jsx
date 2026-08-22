import { useRef, useState } from "react";
import { uploadAvatar } from "../../services/avatarService";
import "./AvatarUpload.css";

const AvatarUpload = () => {
    const inputRef = useRef();
    const [avatar, setAvatar] = useState(null);
    const handleChooseImage = () => {
        inputRef.current.click();
    };
    const handleChange = async(e) => {
    const file = e.target.files[0];
    if(!file) return;
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
    try{
        const result = await uploadAvatar(file);
        console.log(result);
        alert("Upload avatar thành công");
    }
    catch(error){
        console.log(error);
        alert("Upload thất bại");
        }
    };
    return (
        <div className="avatar-upload">
            <div className="avatar-preview">
                {
                    avatar ? (
                        <img src={avatar} alt="Avatar" />
                    ) : (
                        <div className="avatar-placeholder">
                            Chưa có ảnh
                        </div>
                    )
                }
            </div>
            <button
                type="button"
                className="upload-btn"
                onClick={handleChooseImage}
            >
                Chọn ảnh
            </button>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                hidden
                onChange={handleChange}
            />
        </div>
    );
};

export default AvatarUpload;