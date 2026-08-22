import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import "./ProductCard.css";

const ProductCard = ({
    product,
    onDelete,
    isAdmin = false
}) => {
    const { addToCart } = useCart();
    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={product.image}
                    alt={product.name}
                />
                <span className="badge">
                    Mới
                </span>
            </div>
            <div className="product-content">
                <p className="category">
                    {product.category}
                </p>
                <h3>
                    {product.name}
                </h3>
                <p className="brand">
                    Thương hiệu: {product.brand}
                </p>
                <div className="rating">
                    ⭐⭐⭐⭐⭐
                    <span>(5.0)</span>
                </div>
                <p className="price">
                    {Number(product.price).toLocaleString()} đ
                </p>
                <p className="stock">
                    ✔ Còn hàng
                </p>
                <div className="product-actions">
                    <Link to={`/products/${product.id}`}>
                        <button className="detail-btn">
                            Xem chi tiết
                        </button>
                    </Link>
                    {isAdmin ? (
                        <>
                            <Link to={`/admin/products/edit/${product.id}`}>
                                <button className="edit-btn">
                                    Sửa
                                </button>
                            </Link>
                            <button
                                className="delete-btn"
                                onClick={() => onDelete(product.id)}
                            >
                                Xóa
                            </button>
                        </>
                    ) : (
                        <button
                            className="cart-btn"
                            onClick={() => addToCart(product)}
                        >
                            🛒 Thêm vào giỏ
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;