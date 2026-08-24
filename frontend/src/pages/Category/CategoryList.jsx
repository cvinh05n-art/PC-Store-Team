import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryApi from "../../api/categoryApi";
import "./CategoryList.css";

const CategoryList = () => {
    // =========================
    // DANH SÁCH DANH MỤC
    // =========================
    const [categories, setCategories] = useState([]);

    // Trạng thái tải dữ liệu
    const [loading, setLoading] = useState(true);

    // Thông báo lỗi
    const [error, setError] = useState("");

    // =========================
    // LẤY DANH MỤC TỪ DATABASE
    // =========================
    const loadCategories = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await categoryApi.getCategories();
            const result = response.data;

            if (!result?.success) {
                throw new Error(result?.message || "Không thể tải danh mục");
            }

            setCategories(result.data || []);
        } catch (err) {
            console.error("Lỗi tải danh mục:", err);
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Không thể tải danh mục"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    // =========================
    // XÓA DANH MỤC
    // =========================
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;

        try {
            const response = await categoryApi.deleteCategory(id);
            const result = response.data;

            if (!result?.success) {
                throw new Error(result?.message || "Xóa danh mục thất bại");
            }

            await loadCategories();
            alert("Xóa danh mục thành công");
        } catch (err) {
            alert(
                err?.response?.data?.message ||
                err?.message ||
                "Xóa danh mục thất bại"
            );
        }
    };

    return (
        <div className="category-list">
            <div className="category-header">
                <div>
                    <p className="category-eyebrow">ADMIN</p>
                    <h1>Quản lý danh mục</h1>
                    <p>Quản lý danh mục sản phẩm của PC Store.</p>
                </div>

                <Link to="/admin/categories/create">
                    <button className="category-add-btn">+ Thêm danh mục</button>
                </Link>
            </div>

            {error && <div className="category-error">{error}</div>}

            <div className="category-table-wrap">
                <table className="category-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên danh mục</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4">Đang tải...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan="4">Chưa có danh mục.</td></tr>
                        ) : (
                            categories.map((category, index) => (
                                <tr key={category._id}>
                                    <td>{index + 1}</td>
                                    <td>{category.name}</td>
                                    <td>{category.status === false ? "Ẩn" : "Hoạt động"}</td>
                                    <td>
                                        <Link to={`/admin/categories/edit/${category._id}`}>
                                            <button className="category-edit-btn">Sửa</button>
                                        </Link>
                                        <button
                                            className="category-delete-btn"
                                            onClick={() => handleDelete(category._id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
