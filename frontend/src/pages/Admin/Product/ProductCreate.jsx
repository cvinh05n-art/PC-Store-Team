import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../../../api/productApi";
import categoryApi from "../../../api/categoryApi";
import brandApi from "../../../api/brandApi";
import "./ProductCreate.css";

const ProductCreate = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "", price: "", stock: "", category: "", brand: "", image: "", description: ""
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);

    // Lấy danh mục và thương hiệu thật từ MongoDB
    useEffect(() => {
        const loadOptions = async () => {
            try {
                const [categoryRes, brandRes] = await Promise.all([
                    categoryApi.getCategories(),
                    brandApi.getBrands()
                ]);
                setCategories(categoryRes.data?.data || []);
                setBrands(brandRes.data?.data || []);
            } catch (error) {
                console.error("Lỗi lấy danh mục/thương hiệu:", error);
            }
        };
        loadOptions();
    }, []);

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Gửi sản phẩm thật xuống backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await productApi.create({
                ...product,
                price: Number(product.price),
                stock: Number(product.stock)
            });
            alert("Thêm sản phẩm thành công");
            navigate("/admin/products");
        } catch (error) {
            console.error("Lỗi thêm sản phẩm:", error);
            alert(error?.response?.data?.message || "Thêm sản phẩm thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-create">
            <h1>Thêm sản phẩm</h1>
            <form onSubmit={handleSubmit}>
                <label>Tên sản phẩm</label>
                <input name="name" value={product.name} onChange={handleChange} placeholder="Nhập tên sản phẩm" />

                <label>Giá</label>
                <input name="price" type="number" min="0" value={product.price} onChange={handleChange} placeholder="Nhập giá" />

                <label>Tồn kho</label>
                <input name="stock" type="number" min="0" value={product.stock} onChange={handleChange} placeholder="Nhập số lượng tồn kho" />

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

                <label>Link hình ảnh</label>
                <input name="image" value={product.image} onChange={handleChange} placeholder="URL hình ảnh" />

                <label>Mô tả</label>
                <textarea name="description" value={product.description} onChange={handleChange} />

                <button type="submit" disabled={loading}>{loading ? "Đang lưu..." : "Lưu sản phẩm"}</button>
            </form>
        </div>
    );
};

export default ProductCreate;
