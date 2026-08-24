import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrandTable from "../../components/brand/BrandTable";
import brandApi from "../../api/brandApi";

import "./BrandList.css";

const BrandList = () => {

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadBrands = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await brandApi.getBrands();
            const result = response.data;

            if (!result?.success) {
                throw new Error(
                    result?.message ||
                    "Không thể tải danh sách thương hiệu"
                );
            }

            setBrands(
                Array.isArray(result.data)
                    ? result.data
                    : []
            );

        } catch (err) {
            console.error("Lỗi tải thương hiệu:", err);

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Không thể tải danh sách thương hiệu"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBrands();
    }, []);

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Bạn có chắc muốn xóa thương hiệu này?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response =
                await brandApi.deleteBrand(id);

            const result = response.data;

            if (!result?.success) {
                throw new Error(
                    result?.message ||
                    "Không thể xóa thương hiệu"
                );
            }

            await loadBrands();

        } catch (err) {
            console.error(
                "Lỗi xóa thương hiệu:",
                err
            );

            alert(
                err?.response?.data?.message ||
                err?.message ||
                "Không thể xóa thương hiệu"
            );
        }
    };

    return (
        <div className="brand-list">

            <h1>
                Quản lý thương hiệu
            </h1>

            <Link to="/admin/brands/create">
                <button className="add-btn">
                    Thêm thương hiệu
                </button>
            </Link>

            {error && (
                <div
                    style={{
                        margin: "20px 0",
                        padding: "12px 15px",
                        background: "#fee2e2",
                        color: "#b91c1c",
                        borderRadius: "8px"
                    }}
                >
                    {error}
                </div>
            )}

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <BrandTable
                    brands={brands}
                    onDelete={handleDelete}
                />
            )}

        </div>
    );
};

export default BrandList;