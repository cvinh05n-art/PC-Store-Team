import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../../components/product/ProductCard";
import ProductSearch from "../../components/product/ProductSearch";
import ProductFilter from "../../components/product/ProductFilter";
import ProductSort from "../../components/product/ProductSort";
import Pagination from "../../components/product/Pagination";

import productApi from "../../api/productApi";
import { useAuth } from "../../contexts/AuthContext";

import "./ProductList.css";

// ===============================
// DANH MỤC
// ===============================

const categories = [
    {
        id: 1,
        name: "CPU"
    },
    {
        id: 2,
        name: "GPU"
    },
    {
        id: 3,
        name: "RAM"
    },
    {
        id: 4,
        name: "SSD"
    }
];

// ===============================
// THƯƠNG HIỆU
// ===============================

const brands = [
    {
        id: 1,
        name: "Intel"
    },
    {
        id: 2,
        name: "AMD"
    },
    {
        id: 3,
        name: "NVIDIA"
    }
];

// ===============================
// PRODUCT LIST
// ===============================

const ProductList = () => {

    const [products, setProducts] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [category, setCategory] = useState("");

    const [brand, setBrand] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [sort, setSort] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 8;

    const { user } = useAuth();

    // ===============================
    // LẤY DANH SÁCH SẢN PHẨM
    // ===============================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);

                setError("");

                const response = await productApi.getAll();

                setProducts(response.data?.data || []);

            }
            catch (error) {

                console.log("Lỗi lấy sản phẩm:",error);

                setError("Không thể tải danh sách sản phẩm.");

            }
            finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);

    // ===============================
    // LỌC + TÌM KIẾM + SẮP XẾP
    // ===============================

    const filteredProducts = [...products]

        // Tìm kiếm theo tên
        .filter((product) => {

            const name =
                product.name || "";

            return name
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                );

        })

        // Lọc danh mục
        .filter((product) => {

            if (category === "") {

                return true;

            }

            return (
                product.category === category ||
                product.category?.name === category
            );

        })

        // Lọc thương hiệu
        .filter((product) => {

            if (brand === "") {

                return true;

            }

            return (
                product.brand === brand ||
                product.brand?.name === brand
            );

        })

        // Sắp xếp
        .sort((a, b) => {

            if (sort === "priceAsc") {

                return (
                    Number(a.price || 0) -
                    Number(b.price || 0)
                );

            }

            if (sort === "priceDesc") {

                return (
                    Number(b.price || 0) -
                    Number(a.price || 0)
                );

            }

            if (sort === "nameAsc") {

                return (
                    (a.name || "").localeCompare(
                        b.name || ""
                    )
                );

            }

            if (sort === "nameDesc") {

                return (
                    (b.name || "").localeCompare(
                        a.name || ""
                    )
                );

            }

            return 0;

        });

    // ===============================
    // PHÂN TRANG
    // ===============================

    const totalPages = Math.ceil(
        filteredProducts.length /
        productsPerPage
    );

    const currentProducts =
        filteredProducts.slice(
            (currentPage - 1) *
                productsPerPage,

            currentPage *
                productsPerPage
        );

    // ===============================
    // RESET TRANG KHI FILTER
    // ===============================

    useEffect(() => {

        setCurrentPage(1);

    }, [
        keyword,
        category,
        brand,
        sort
    ]);

    // ===============================
    // XÓA SẢN PHẨM
    // ===============================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Bạn có chắc chắn muốn xóa sản phẩm này?"
            );

        if (!confirmDelete) {

            return;

        }

        try {

            await productApi.delete(id);

            setProducts((prev) =>
                prev.filter(
                    (product) =>
                        (product._id || product.id) !== id
                )
            );

            alert(
                "Xóa sản phẩm thành công"
            );

        }
        catch (error) {

            console.log(
                "Lỗi xóa sản phẩm:",
                error
            );

            alert(
                "Xóa sản phẩm thất bại"
            );

        }

    };

    // ===============================
    // LOADING
    // ===============================

    if (loading) {

        return (

            <div className="loading">

                <h2>
                    Đang tải sản phẩm...
                </h2>

            </div>

        );

    }

    // ===============================
    // ERROR
    // ===============================

    if (error) {

        return (

            <div className="loading">

                <h2>
                    {error}
                </h2>

                <button
                    onClick={() =>
                        window.location.reload()
                    }
                >
                    Thử lại
                </button>

            </div>

        );

    }

    // ===============================
    // GIAO DIỆN
    // ===============================

    return (

        <div className="product-list">

            {/* TITLE */}

            <h1>
                Danh sách sản phẩm
            </h1>

            {/* SỐ LƯỢNG */}

            <p className="product-count">

                Có{" "}

                <strong>
                    {filteredProducts.length}
                </strong>

                {" "}sản phẩm

            </p>

            {/* ADMIN TOOLBAR */}

            {
                user?.role === "ADMIN" && (

                    <div className="toolbar">

                        <Link
                            to="/admin/products/create"
                        >

                            <button
                                className="add-product"
                            >
                                + Thêm sản phẩm
                            </button>

                        </Link>

                    </div>

                )
            }

            {/* SEARCH */}

            <ProductSearch

                keyword={keyword}

                setKeyword={setKeyword}

            />

            {/* FILTER */}

            <ProductFilter

                categories={categories}

                brands={brands}

                selectedCategory={category}

                selectedBrand={brand}

                onCategoryChange={
                    setCategory
                }

                onBrandChange={
                    setBrand
                }

            />

            {/* SORT */}

            <ProductSort

                sort={sort}

                setSort={setSort}

            />

            {/* PRODUCT GRID */}

            <div className="grid">

                {
                    currentProducts.length > 0

                    ?

                    currentProducts.map(
                        (product) => (

                            <ProductCard

                                key={product._id || product.id}

                                product={product}

                                isAdmin={
                                    user?.role ===
                                    "ADMIN"
                                }

                                onDelete={
                                    handleDelete
                                }

                            />

                        )
                    )

                    :

                    (

                        <div className="no-products">

                            <h3>
                                Không có sản phẩm
                            </h3>

                            <p>
                                Thử thay đổi
                                từ khóa hoặc
                                bộ lọc.
                            </p>

                        </div>

                    )
                }

            </div>

            {/* PAGINATION */}

            {
                totalPages > 0 && (

                    <Pagination

                        currentPage={
                            currentPage
                        }

                        totalPages={
                            totalPages
                        }

                        setCurrentPage={
                            setCurrentPage
                        }

                    />

                )
            }

        </div>

    );

};

export default ProductList;