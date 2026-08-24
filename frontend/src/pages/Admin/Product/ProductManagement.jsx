import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productApi from "../../../api/productApi";
import "./ProductManagement.css";

const ProductManagement = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await productApi.getAll();

                setProducts(response.data?.data || []);

            } catch (error) {

                console.log("Lỗi lấy sản phẩm:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Bạn có chắc muốn xóa sản phẩm?"
        );

        if (!confirmDelete) return;

        try {

            await productApi.delete(id);

            setProducts(prevProducts =>
                prevProducts.filter(product => (product._id || product.id) !== id)
            );

            alert("Xóa sản phẩm thành công");

        } catch (error) {

            console.log("Lỗi xóa sản phẩm:", error);

            alert("Xóa sản phẩm thất bại");

        }

    };

    if (loading) {

        return <h2>Đang tải sản phẩm...</h2>;

    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    return (

        <div className="product-management">

            <div className="header">

                <h1>Quản lý sản phẩm</h1>

                <Link to="/admin/products/create">

                    <button>+ Thêm sản phẩm</button>

                </Link>

            </div>

            <input
                className="search"
                type="text"
                placeholder="🔍 Tìm kiếm sản phẩm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <table>

                <thead>

                    <tr>

                        <th>STT</th>

                        <th>Ảnh</th>

                        <th>Tên sản phẩm</th>

                        <th>Giá</th>

                        <th>Danh mục</th>

                        <th>Thương hiệu</th>

                        <th>Trạng thái</th>

                        <th>Thao tác</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredProducts.map((product, index) => (

                        <tr key={product._id || product.id}>

                            <td>{index + 1}</td>

                            <td>

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />

                            </td>

                            <td>{product.name}</td>

                            <td>

                                {Number(product.price).toLocaleString()} đ

                            </td>

                            <td>{product.category?.name || product.category || "-"}</td>

                            <td>{product.brand?.name || product.brand || "-"}</td>

                            <td>

                                <span className="in-stock">

                                    Còn hàng

                                </span>

                            </td>

                            <td>

                                <Link
                                    to={`/admin/products/edit/${product._id || product.id}`}
                                >

                                    <button className="edit-btn">

                                        ✏️ Sửa

                                    </button>

                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(product._id || product.id)}
                                >

                                    🗑 Xóa

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default ProductManagement;