import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "../../../api/productApi";
import categoryApi from "../../../api/categoryApi";
import brandApi from "../../../api/brandApi";
import "./ProductEdit.css";

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "", price: "", stock: 0, category: "", brand: "", image: "", description: ""
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy sản phẩm + các option liên quan
    useEffect(() => {
        const loadData = async () => {
            try {
                const [productRes, categoryRes, brandRes] = await Promise.all([
                    productApi.getById(id),
                    categoryApi.getCategories(),
                    brandApi.getBrands()
                ]);

                const p = productRes.data?.data || {};
                setProduct({
                    name: p.name || "",
                    price: p.price ?? "",
                    stock: p.stock ?? 0,
                    category: p.category?._id || p.category || "",
                    brand: p.brand?._id || p.brand || "",
                    image: p.image || "",
                    description: p.description || ""
                });

                setCategories(categoryRes.data?.data || []);
                setBrands(brandRes.data?.data || []);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu sản phẩm:", error);
                alert("Không thể tải sản phẩm");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Gửi cập nhật thật xuống backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productApi.update(id, {
                ...product,
                price: Number(product.price),
                stock: Number(product.stock)
            });
            alert("Cập nhật sản phẩm thành công");
            navigate("/admin/products");
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
            alert(error?.response?.data?.message || "Cập nhật thất bại");
        }
    };

    if (loading) return <div className="product-edit"><h2>Đang tải...</h2></div>;

    return (
        <div className="product-edit">
            <h1>Chỉnh sửa sản phẩm</h1>
            <form onSubmit={handleSubmit}>
                <label>Tên sản phẩm</label>
                <input name="name" value={product.name} onChange={handleChange} />

                <label>Giá</label>
                <input type="number" min="0" name="price" value={product.price} onChange={handleChange} />

                <label>Tồn kho</label>
                <input type="number" min="0" name="stock" value={product.stock} onChange={handleChange} />

                <label>Danh mục</label>
                <select name="category" value={product.category} onChange={handleChange}>
                    <option value="">Chọn danh mục</option>
                    {categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
                </select>

                <label>Thương hiệu</label>
                <select name="brand" value={product.brand} onChange={handleChange}>
                    <option value="">Chọn thương hiệu</option>
                    {brands.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
                </select>

                <label>Hình ảnh</label>
                <input name="image" value={product.image} onChange={handleChange} />

                <label>Mô tả</label>
                <textarea name="description" value={product.description} onChange={handleChange} />

                <button type="submit">Cập nhật</button>
            </form>
        </div>
    );
};

export default ProductEdit;
