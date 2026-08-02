import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import productApi from "../../api/productApi";
import "./ProductDetail.css";
const ProductDetail = () => {
const { id } = useParams();
const { addToCart } = useCart();
const [product,setProduct] = useState(null);
const [quantity,setQuantity] = useState(1);
const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const fetchProduct = async()=>{
            try{
                const response = await productApi.getById(id);
                setProduct(response.data);
            }
            catch(error){
                console.log(
                    "Lỗi lấy chi tiết sản phẩm:",
                    error
                );
            }
            finally{
                setLoading(false);
            }
        };
        fetchProduct();
    },[id]);
    if(loading){
        return (
            <h2>
                Đang tải sản phẩm...
            </h2>
        );
    }
    if(!product){
        return (
            <h2>
                Không tìm thấy sản phẩm
            </h2>
        );
    }
    const handleAddToCart = async () => {
        try {
            await addToCart(product, quantity);
            alert("Đã thêm sản phẩm vào giỏ hàng");
        }
        catch (error) {
            console.log(error);
            alert("Không thể thêm sản phẩm vào giỏ hàng");
        }
    };
    return (
        <div className="product-detail">
            <div className="left">
                <img
                    src={product.image || "https://via.placeholder.com/500"}
                    alt={product.name}
                />
            </div>
            <div className="right">
                <h1>
                    {product.name}
                </h1>
                <p className="brand">
                    Thương hiệu:
                    <strong>
                        {" "}
                        {product.brand?.name || product.brand}
                    </strong>
                </p>
                <p className="category">
                    Danh mục:
                    <strong>
                        {" "}
                        {product.category?.name || product.category}
                    </strong>
                </p>
                <div className="rating">
                    ⭐⭐⭐⭐⭐
                    <span>
                        (5.0)
                    </span>
                </div>
                <h2>
                    {
                    Number(product.price)
                    .toLocaleString()
                    }
                    đ
                </h2>
                <p className="stock">
                    ✔ Còn hàng
                </p>
                <p className="description">
                    {
                    product.description
                    }
                </p>
                <div className="quantity">
                    <button
                        onClick={()=>
                            quantity > 1
                            &&
                            setQuantity(quantity-1)
                        }
                    >
                        -
                    </button>
                    <span>
                        {quantity}
                    </span>
                    <button
                        onClick={() =>
                            quantity < product.stock &&
                            setQuantity(quantity + 1)
                        }
                    >
                        +
                    </button>
                </div>
                <button
                    className="buy-btn"
                    onClick={handleAddToCart}
                >
                    🛒 Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    );
};
export default ProductDetail;