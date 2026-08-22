import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import CartItem from "../../components/cart/CartItem";
import "./Cart.css";

const Cart = () => {
    const {
        cart,
        loading,
        processing,
        totalPrice,
        itemCount,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();
    if (loading) {
        return (
            <div className="cart-loading">
                <h2>Đang tải giỏ hàng...</h2>
            </div>
        );
    }
    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <h1>🛒 Giỏ hàng trống</h1>
                <p>
                    Chưa có sản phẩm nào trong giỏ hàng.
                </p>
                <Link to="/products">
                    <button className="continue-btn">
                        Tiếp tục mua hàng
                    </button>
                </Link>
            </div>
        );
    }
    return (
        <div className="cart">
            <div className="cart-header">
                <h1>Giỏ hàng</h1>
                <span>
                    {itemCount} sản phẩm
                </span>
            </div>
            <div className="cart-list">
                {cart.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                        onRemove={removeFromCart}
                        disabled={processing}
                    />
                ))}
            </div>
            <div className="cart-total">
                <h3>
                    Tổng đơn hàng
                </h3>
                <h2>
                    {Number(totalPrice).toLocaleString("vi-VN")} đ
                </h2>
                <div className="cart-actions">
                    <Link to="/products">
                        <button className="continue-btn">
                            Tiếp tục mua
                        </button>
                    </Link>
                    <Link to="/checkout">
                        <button
                            className="checkout-btn"
                            disabled={processing}
                        >
                            {processing
                                ? "Đang xử lý..."
                                : "Thanh toán"}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;