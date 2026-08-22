import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CategoryForm.css";

const CategoryForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState({
        name:""
    });
    const handleChange = (e)=>{
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(category);
        alert(
            id 
            ? "Cập nhật danh mục thành công"
            : "Thêm danh mục thành công"
        );
        navigate("/admin/categories");
    }
    return (
        <div className="category-form">
            <h1>
                {id 
                ? "Chỉnh sửa danh mục"
                : "Thêm danh mục"}
            </h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Tên danh mục
                </label>
                <input
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    placeholder="Nhập tên danh mục"
                />
                <button type="submit">
                    {id 
                    ? "Cập nhật"
                    : "Lưu"}
                </button>
            </form>
        </div>
    );
}

export default CategoryForm;