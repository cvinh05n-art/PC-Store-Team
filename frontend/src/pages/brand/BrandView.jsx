import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import brandApi from "../../api/brandApi";

import "./BrandView.css";


const BrandView = () => {

    // =========================
    // DANH SÁCH THƯƠNG HIỆU
    // =========================
    // Dữ liệu sẽ được lấy từ
    // backend thay vì hard-code.
    // =========================

    const [brands, setBrands] =
        useState([]);


    // =========================
    // TRẠNG THÁI LOADING
    // =========================

    const [loading, setLoading] =
        useState(true);


    // =========================
    // THÔNG BÁO LỖI
    // =========================

    const [error, setError] =
        useState("");


    // =========================
    // LẤY THƯƠNG HIỆU
    // =========================
    // Gọi:
    // GET /api/brands
    //
    // Dữ liệu được lấy trực tiếp
    // từ MongoDB thông qua backend.
    // =========================

    useEffect(() => {

        const loadBrands = async () => {

            try {

                setLoading(true);
                setError("");


                const response =
                    await brandApi.getBrands();


                const result =
                    response.data;


                // Kiểm tra API có thành công không.

                if (!result?.success) {

                    throw new Error(
                        result?.message ||
                        "Không thể tải danh sách thương hiệu"
                    );

                }


                // Lưu danh sách thương hiệu
                // vào state.

                setBrands(
                    Array.isArray(
                        result.data
                    )
                        ? result.data
                        : []
                );


            } catch (err) {

                console.error(
                    "Lỗi lấy thương hiệu:",
                    err
                );


                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Không thể tải danh sách thương hiệu"
                );


            } finally {

                setLoading(false);

            }

        };


        loadBrands();

    }, []);


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="brand-view">

                <div className="brand-view-header">

                    <p className="brand-eyebrow">
                        PC STORE
                    </p>

                    <h1>
                        Thương hiệu
                    </h1>

                    <p>
                        Đang tải danh sách thương hiệu...
                    </p>

                </div>

            </div>

        );

    }


    // =========================
    // ERROR
    // =========================

    if (error) {

        return (

            <div className="brand-view">

                <div className="brand-view-header">

                    <p className="brand-eyebrow">
                        PC STORE
                    </p>

                    <h1>
                        Thương hiệu
                    </h1>

                    <p className="brand-error">
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    // =========================
    // GIAO DIỆN
    // =========================

    return (

        <div className="brand-view">


            {/* =========================
                HEADER
            ========================= */}

            <div className="brand-view-header">

                <p className="brand-eyebrow">
                    PC STORE
                </p>

                <h1>
                    Thương hiệu
                </h1>

                <p>
                    Khám phá các thương hiệu linh kiện
                    đang được bán tại PC Store.
                </p>

            </div>


            {/* =========================
                DANH SÁCH THƯƠNG HIỆU
            ========================= */}

            <div className="brand-grid">

                {brands.length > 0 ? (

                    brands.map((brand) => (

                        <div
                            className="brand-card"
                            key={brand._id}
                        >


                            {/* =========================
                                LOGO THƯƠNG HIỆU
                            ========================= */}

                            <div className="brand-logo">

                                {brand.name
                                    ?.charAt(0)
                                    ?.toUpperCase()}

                            </div>


                            {/* =========================
                                TÊN THƯƠNG HIỆU
                            ========================= */}

                            <h3>
                                {brand.name}
                            </h3>


                            {/* =========================
                                XEM SẢN PHẨM
                            ========================= */}
                            {/* Khi click sẽ chuyển tới:
                                
                                /products?brand=ID

                                ProductList sẽ đọc ID này
                                và tự động lọc sản phẩm.
                            */}

                            <Link
                                to={`/products?brand=${brand._id}`}
                                className="brand-products-link"
                            >
                                Xem sản phẩm
                            </Link>


                        </div>

                    ))

                ) : (

                    <div className="brand-empty">

                        <h3>
                            Chưa có thương hiệu
                        </h3>

                        <p>
                            Hiện chưa có thương hiệu nào
                            trong hệ thống.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

};


export default BrandView;