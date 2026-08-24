import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Link,
    useSearchParams
} from "react-router-dom";

import ProductCard
    from "../../components/product/ProductCard";

import ProductSearch
    from "../../components/product/ProductSearch";

import ProductFilter
    from "../../components/product/ProductFilter";

import ProductSort
    from "../../components/product/ProductSort";

import Pagination
    from "../../components/product/Pagination";

import productApi
    from "../../api/productApi";

import categoryApi
    from "../../api/categoryApi";

import brandApi
    from "../../api/brandApi";

import { useAuth }
    from "../../contexts/AuthContext";

import "./ProductList.css";


const ProductList = () => {
    // =========================
// LẤY THAM SỐ TỪ URL
// =========================
// Ví dụ:
// /products?brand=65abc123
//
// brandFromUrl sẽ là:
// 65abc123
// =========================

const [searchParams] =
    useSearchParams();

const brandFromUrl =
    searchParams.get("brand") || "";

    // =========================
    // DỮ LIỆU SẢN PHẨM
    // =========================

    const [products, setProducts] =
        useState([]);


    // =========================
    // DỮ LIỆU DANH MỤC
    // =========================

    const [categories, setCategories] =
        useState([]);


    // =========================
    // DỮ LIỆU THƯƠNG HIỆU
    // =========================

    const [brands, setBrands] =
        useState([]);


    // =========================
    // TỪ KHÓA TÌM KIẾM
    // =========================

    const [keyword, setKeyword] =
        useState("");


    // =========================
    // DANH MỤC ĐANG CHỌN
    // =========================

    const [category, setCategory] =
        useState("");


// =========================
// THƯƠNG HIỆU ĐANG CHỌN
// =========================
// Nếu URL có ?brand=...
// thì tự chọn thương hiệu đó.
// =========================

const [brand, setBrand] =
    useState(brandFromUrl);
    // =========================
    // KIỂU SẮP XẾP
    // =========================

    const [sort, setSort] =
        useState("");


    // =========================
    // TRẠNG THÁI LOADING
    // =========================

    const [loading, setLoading] =
        useState(true);


        // =========================
    // ĐỒNG BỘ BRAND TỪ URL
    // =========================
    // Khi người dùng bấm một thương hiệu
    // từ trang /brands, URL thay đổi.
    // State brand cũng phải cập nhật theo.
    // =========================

    useEffect(() => {

    setBrand(
        searchParams.get("brand") || ""
    );

}, [searchParams]);
    // =========================
    // THÔNG BÁO LỖI
    // =========================

    const [error, setError] =
        useState("");


    // =========================
    // TRANG HIỆN TẠI
    // =========================

    const [currentPage, setCurrentPage] =
        useState(1);


    // =========================
    // SỐ SẢN PHẨM MỖI TRANG
    // =========================

    const productsPerPage = 8;


    // =========================
    // USER ĐANG ĐĂNG NHẬP
    // =========================

    const { user } = useAuth();


    // ==================================================
    // 1. LẤY SẢN PHẨM TỪ BACKEND
    // ==================================================

    useEffect(() => {

        const loadProducts = async () => {

            try {

                setLoading(true);

                setError("");


                // Gọi API lấy sản phẩm thật từ MongoDB.

                const response =
                    await productApi.getAll();


                // Backend trả:

                // {
                //     success: true,
                //     data: [...]
                // }

                setProducts(
                    response.data?.data || []
                );


            } catch (err) {

                console.error(
                    "Lỗi lấy sản phẩm:",
                    err
                );

                setError(
                    "Không thể tải danh sách sản phẩm."
                );


            } finally {

                setLoading(false);

            }

        };


        loadProducts();

    }, []);


    // ==================================================
    // 2. LẤY DANH MỤC TỪ BACKEND
    // ==================================================

    useEffect(() => {

        const loadCategories = async () => {

            try {

                const response =
                    await categoryApi.getCategories();


                // Lưu danh mục thật vào state.

                setCategories(
                    response.data?.data || []
                );


            } catch (err) {

                console.error(
                    "Lỗi lấy danh mục:",
                    err
                );

            }

        };


        loadCategories();

    }, []);


    // ==================================================
    // 3. LẤY THƯƠNG HIỆU TỪ BACKEND
    // ==================================================

    useEffect(() => {

        const loadBrands = async () => {

            try {

                const response =
                    await brandApi.getBrands();


                // Lưu thương hiệu thật vào state.

                setBrands(
                    response.data?.data || []
                );


            } catch (err) {

                console.error(
                    "Lỗi lấy thương hiệu:",
                    err
                );

            }

        };


        loadBrands();

    }, []);


    // ==================================================
    // 4. LỌC + SẮP XẾP
    // ==================================================

    const filteredProducts =
        useMemo(() => {

            // Tạo bản sao để không thay đổi
            // mảng products gốc.

            let result = [
                ...products
            ];


            // ==========================================
            // TÌM KIẾM THEO TÊN
            // ==========================================

            if (keyword.trim()) {

                const search =
                    keyword
                        .trim()
                        .toLowerCase();


                result =
                    result.filter(
                        (product) => {

                            return (
                                product.name ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    search
                                );

                        }
                    );

            }


            // ==========================================
            // LỌC THEO DANH MỤC
            // ==========================================

            if (category) {

                result =
                    result.filter(
                        (product) => {

                            // Backend có thể trả category
                            // dưới dạng Object sau populate
                            // hoặc chỉ trả ObjectId.

                            const productCategory =
                                product.category;


                            if (!productCategory) {
                                return false;
                            }


                            // Lấy ID danh mục.

                            const categoryId =
                                typeof productCategory ===
                                "object"

                                    ? productCategory._id

                                    : productCategory;


                            // Chỉ giữ sản phẩm
                            // thuộc danh mục được chọn.

                            return (
                                String(categoryId) ===
                                String(category)
                            );

                        }
                    );

            }


            // ==========================================
            // LỌC THEO THƯƠNG HIỆU
            // ==========================================

            if (brand) {

                result =
                    result.filter(
                        (product) => {

                            const productBrand =
                                product.brand;


                            if (!productBrand) {
                                return false;
                            }


                            // Lấy ID thương hiệu.

                            const brandId =
                                typeof productBrand ===
                                "object"

                                    ? productBrand._id

                                    : productBrand;


                            // Chỉ giữ sản phẩm
                            // thuộc thương hiệu đã chọn.

                            return (
                                String(brandId) ===
                                String(brand)
                            );

                        }
                    );

            }


            // ==========================================
            // SẮP XẾP
            // ==========================================

            result.sort(
                (a, b) => {


                    // --------------------------
                    // GIÁ TĂNG DẦN
                    // --------------------------

                    if (
                        sort ===
                        "priceAsc"
                    ) {

                        return (
                            Number(
                                a.price || 0
                            ) -

                            Number(
                                b.price || 0
                            )
                        );

                    }


                    // --------------------------
                    // GIÁ GIẢM DẦN
                    // --------------------------

                    if (
                        sort ===
                        "priceDesc"
                    ) {

                        return (
                            Number(
                                b.price || 0
                            ) -

                            Number(
                                a.price || 0
                            )
                        );

                    }


                    // --------------------------
                    // TÊN A-Z
                    // --------------------------

                    if (
                        sort ===
                        "nameAsc"
                    ) {

                        return (
                            a.name || ""
                        )
                            .localeCompare(
                                b.name || "",
                                "vi",
                                {
                                    sensitivity:
                                        "base"
                                }
                            );

                    }


                    // --------------------------
                    // TÊN Z-A
                    // --------------------------

                    if (
                        sort ===
                        "nameDesc"
                    ) {

                        return (
                            b.name || ""
                        )
                            .localeCompare(
                                a.name || "",
                                "vi",
                                {
                                    sensitivity:
                                        "base"
                                }
                            );

                    }


                    // Không chọn sắp xếp.

                    return 0;

                }
            );


            return result;


        }, [

            // useMemo chạy lại khi
            // một trong các giá trị này thay đổi.

            products,
            keyword,
            category,
            brand,
            sort

        ]);


    // ==================================================
    // 5. RESET VỀ TRANG 1 KHI ĐỔI BỘ LỌC
    // ==================================================

    useEffect(() => {

        setCurrentPage(1);

    }, [

        keyword,
        category,
        brand,
        sort

    ]);


    // ==================================================
    // 6. PHÂN TRANG
    // ==================================================

    const totalPages =
        Math.ceil(
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


    // ==================================================
    // 7. XÓA SẢN PHẨM
    // ==================================================

    const handleDelete = async (id) => {

        // Hỏi xác nhận trước khi xóa.

        const confirmDelete =
            window.confirm(
                "Bạn có chắc chắn muốn xóa sản phẩm này?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            // Gọi API DELETE.

            await productApi.delete(id);


            // Xóa sản phẩm khỏi state
            // sau khi backend thành công.

            setProducts(
                (prev) =>
                    prev.filter(
                        (product) =>
                            String(
                                product._id
                            ) !==
                            String(id)
                    )
            );


            alert(
                "Xóa sản phẩm thành công"
            );


        } catch (err) {

            console.error(
                "Lỗi xóa sản phẩm:",
                err
            );


            alert(
                err?.response?.data?.message ||
                "Xóa sản phẩm thất bại"
            );

        }

    };


    // ==================================================
    // 8. LOADING
    // ==================================================

    if (loading) {

        return (

            <div className="loading">

                <h2>
                    Đang tải sản phẩm...
                </h2>

            </div>

        );

    }


    // ==================================================
    // 9. ERROR
    // ==================================================

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


    // ==================================================
    // 10. GIAO DIỆN
    // ==================================================

    return (

        <div className="product-list">


            {/* =========================
                TIÊU ĐỀ
            ========================= */}

            <div className="product-header">

                <div>

                    <h1>
                        Danh sách sản phẩm
                    </h1>

                    <p className="product-count">

                        Có{" "}

                        <strong>
                            {
                                filteredProducts.length
                            }
                        </strong>

                        {" "}sản phẩm

                    </p>

                </div>


                {/* =========================
                    NÚT THÊM CHO ADMIN
                ========================= */}

                {user?.role
                    ?.toUpperCase() ===
                    "ADMIN" && (

                    <Link
                        to="/admin/products/create"
                    >

                        <button
                            className="add-product"
                        >
                            + Thêm sản phẩm
                        </button>

                    </Link>

                )}

            </div>


            {/* =========================
                TÌM KIẾM
            ========================= */}

            <ProductSearch

                keyword={
                    keyword
                }

                setKeyword={
                    setKeyword
                }

            />


            {/* =========================
                BỘ LỌC
            ========================= */}

            <ProductFilter

                categories={
                    categories
                }

                brands={
                    brands
                }

                selectedCategory={
                    category
                }

                selectedBrand={
                    brand
                }

                onCategoryChange={
                    setCategory
                }

                onBrandChange={
                    setBrand
                }

            />


            {/* =========================
                SẮP XẾP
            ========================= */}

            <div className="sort-wrapper">

                <ProductSort

                    sort={
                        sort
                    }

                    onSortChange={
                        setSort
                    }

                />

            </div>


            {/* =========================
                HIỂN THỊ BỘ LỌC ĐANG DÙNG
            ========================= */}

            {(keyword ||
                category ||
                brand ||
                sort) && (

                <div className="active-filters">


                    {/* Từ khóa */}

                    {keyword && (

                        <span>
                            Từ khóa:{" "}
                            {keyword}
                        </span>

                    )}


                    {/* Danh mục */}

                    {category && (

                        <span>

                            Danh mục:{" "}

                            {
                                categories.find(
                                    (item) =>
                                        String(
                                            item._id
                                        ) ===
                                        String(
                                            category
                                        )
                                )?.name ||
                                "Đã chọn"
                            }

                        </span>

                    )}


                    {/* Thương hiệu */}

                    {brand && (

                        <span>

                            Thương hiệu:{" "}

                            {
                                brands.find(
                                    (item) =>
                                        String(
                                            item._id
                                        ) ===
                                        String(
                                            brand
                                        )
                                )?.name ||
                                "Đã chọn"
                            }

                        </span>

                    )}


                    {/* Kiểu sắp xếp */}

                    {sort && (

                        <span>

                            Sắp xếp:{" "}

                            {sort ===
                                "priceAsc"
                                ? "Giá tăng dần"

                                : sort ===
                                    "priceDesc"
                                    ? "Giá giảm dần"

                                    : sort ===
                                        "nameAsc"
                                        ? "Tên A-Z"

                                        : "Tên Z-A"}

                        </span>

                    )}


                    {/* Xóa toàn bộ bộ lọc */}

                    <button
                        onClick={() => {

                            setKeyword("");
                            setCategory("");
                            setBrand("");
                            setSort("");

                        }}
                    >
                        Xóa bộ lọc
                    </button>

                </div>

            )}


            {/* =========================
                DANH SÁCH SẢN PHẨM
            ========================= */}

            <div className="grid">

                {currentProducts.length > 0 ? (

                    currentProducts.map(
                        (product) => (

                            <ProductCard

                                key={
                                    product._id
                                }

                                product={
                                    product
                                }

                                isAdmin={
                                    user?.role
                                        ?.toUpperCase() ===
                                    "ADMIN"
                                }

                                onDelete={
                                    handleDelete
                                }

                            />

                        )

                    )

                ) : (

                    <div className="no-products">

                        <h3>
                            Không có sản phẩm
                        </h3>

                        <p>
                            Không tìm thấy sản phẩm
                            phù hợp với bộ lọc hiện tại.
                        </p>

                    </div>

                )}

            </div>


            {/* =========================
                PHÂN TRANG
            ========================= */}

            {totalPages > 1 && (

                <Pagination

                    currentPage={
                        currentPage
                    }

                    totalPages={
                        totalPages
                    }

                    onPageChange={
                        setCurrentPage
                    }

                />

            )}

        </div>

    );

};

export default ProductList;