import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./ProductForm.css";
import { useParams } from "react-router-dom";
const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
        category: "",
        brand: "",
        description: ""
    });
    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        alert("Lưu sản phẩm thành công");
        navigate("/products");
    };
    return (
        <div className="product-form">
            <h1>
                {id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
            </h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Tên sản phẩm"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                />
                <Input
                    label="Giá"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                />
                <Input
                    label="Link ảnh"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                />
                <Input
                    label="Danh mục"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                />
                <Input
                    label="Thương hiệu"
                    name="brand"
                    value={product.brand}
                    onChange={handleChange}
                />
                <div className="textarea-group">
                    <label>Mô tả</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    type="submit"
                    text={id ? "Cập nhật" : "Lưu sản phẩm"}
                />
            </form>
        </div>
    );
};
export default ProductForm;