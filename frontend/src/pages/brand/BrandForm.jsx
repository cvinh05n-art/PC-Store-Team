import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BrandForm.css";

const BrandForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [brand,setBrand] = useState({
        name:""
    });
    const handleChange = (e)=>{
        setBrand({
            ...brand,
            [e.target.name]:e.target.value
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(brand);
        alert(
            id
            ? "Cập nhật thương hiệu thành công"
            : "Thêm thương hiệu thành công"
        );
        navigate("/admin/brands");
    };
    return (
        <div className="brand-form">
            <h1>
                {
                id
                ? "Chỉnh sửa thương hiệu"
                : "Thêm thương hiệu"
                }
            </h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Tên thương hiệu
                </label>
                <input
                    type="text"
                    name="name"
                    value={brand.name}
                    onChange={handleChange}
                    placeholder="Nhập tên thương hiệu"
                />
                <button type="submit">
                    {
                    id
                    ? "Cập nhật"
                    : "Lưu"
                    }
                </button>
            </form>
        </div>
    );
};

export default BrandForm;