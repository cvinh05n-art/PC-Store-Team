import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p className="price">
        {product.price.toLocaleString()} đ
      </p>

      <div className="product-actions">
        <Link to={`/products/${product.id}`}>
          <button>Xem chi tiết</button>
        </Link>

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
      </div>
    </div>
  );
};

export default ProductCard;