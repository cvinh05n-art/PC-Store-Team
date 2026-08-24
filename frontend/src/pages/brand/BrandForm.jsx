import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import brandApi from "../../api/brandApi";

import "./BrandForm.css";

const BrandForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = Boolean(id);

    const [brand, setBrand] = useState({
        name: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // LOAD BRAND KHI EDIT
    // =========================

    useEffect(() => {

        if (!isEdit) {
            return;
        }

        const loadBrand = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await brandApi.getBrandById(id);

                const result =
                    response.data;

                if (!result?.success) {
                    throw new Error(
                        result?.message ||
                        "Không thể tải thương hiệu"
                    );
                }

                setBrand({
                    name: result.data?.name || ""
                });

            } catch (err) {

                console.error(
                    "Lỗi tải thương hiệu:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Không thể tải thương hiệu"
                );

            } finally {

                setLoading(false);

            }
        };

        loadBrand();

    }, [id, isEdit]);

    // =========================
    // INPUT
    // =========================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setBrand((prev) => ({
            ...prev,
            [name]: value
        }));

        if (error) {
            setError("");
        }
    };

    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const name =
            brand.name.trim();

        if (!name) {

            setError(
                "Tên thương hiệu không được để trống"
            );

            return;
        }

        try {

            setLoading(true);
            setError("");

            let response;

            if (isEdit) {

                response =
                    await brandApi.updateBrand(
                        id,
                        {
                            name
                        }
                    );

            } else {

                response =
                    await brandApi.createBrand({
                        name
                    });

            }

            const result =
                response.data;

            if (!result?.success) {

                throw new Error(
                    result?.message ||
                    "Không thể lưu thương hiệu"
                );
            }

            alert(
                isEdit
                    ? "Cập nhật thương hiệu thành công"
                    : "Thêm thương hiệu thành công"
            );

            navigate(
                "/admin/brands",
                {
                    replace: true
                }
            );

        } catch (err) {

            console.error(
                "Lỗi lưu thương hiệu:",
                err
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Không thể lưu thương hiệu"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="brand-form">

            <h1>
                {isEdit
                    ? "Chỉnh sửa thương hiệu"
                    : "Thêm thương hiệu"
                }
            </h1>

            {error && (
                <div
                    style={{
                        marginBottom: "20px",
                        padding: "12px",
                        background: "#fee2e2",
                        color: "#b91c1c",
                        borderRadius: "8px"
                    }}
                >
                    {error}
                </div>
            )}

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
                    disabled={loading}
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Đang lưu..."
                        : isEdit
                            ? "Cập nhật"
                            : "Lưu"
                    }
                </button>

            </form>

        </div>
    );
};

export default BrandForm;