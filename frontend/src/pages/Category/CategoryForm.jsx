import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryApi from "../../api/categoryApi";
import "./CategoryForm.css";

const CategoryForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [category, setCategory] = useState({ name: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Lấy dữ liệu cũ khi đang sửa
    useEffect(() => {
        if (!isEdit) return;

        const loadCategory = async () => {
            try {
                setLoading(true);
                const response = await categoryApi.getCategoryById(id);
                setCategory({ name: response.data?.data?.name || "" });
            } catch (err) {
                setError(err?.response?.data?.message || "Không thể tải danh mục");
            } finally {
                setLoading(false);
            }
        };

        loadCategory();
    }, [id, isEdit]);

    const handleChange = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    // Gọi POST/PUT thật xuống MongoDB
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category.name.trim()) {
            setError("Tên danh mục không được để trống");
            return;
        }

        try {
            setLoading(true);

            if (isEdit) {
                await categoryApi.updateCategory(id, { name: category.name.trim() });
            } else {
                await categoryApi.createCategory({ name: category.name.trim() });
            }

            alert(isEdit ? "Cập nhật danh mục thành công" : "Thêm danh mục thành công");
            navigate("/admin/categories", { replace: true });
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Lưu danh mục thất bại"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="category-form">
            <h1>{isEdit ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</h1>
            {error && <div className="category-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <label>Tên danh mục</label>
                <input
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    placeholder="Nhập tên danh mục"
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Đang lưu..." : isEdit ? "Cập nhật" : "Lưu"}
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
