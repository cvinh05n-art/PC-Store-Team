import { Link } from "react-router-dom";

import { useCart } from "../../contexts/CartContext";

import CartItem from "../../components/cart/CartItem";

import "./Cart.css";

const Cart = () => {

    const {

        cart,

        loading,

        totalPrice,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart

    } = useCart();

    if (loading) {

        return (

            <h2>

                Đang tải giỏ hàng...

            </h2>

        );

    }

    if (cart.length === 0) {

        return (

            <div className="cart-empty">

                <h1>

                    Giỏ hàng trống

                </h1>

                <p>

                    Chưa có sản phẩm nào trong giỏ hàng

                </p>

                <Link to="/products">

                    <button>

                        Tiếp tục mua hàng

                    </button>

                </Link>

            </div>

        );

    }

    return (

        <div className="cart">

            <h1>

                Giỏ hàng

            </h1>

            {

                cart.map(item => (

                    <CartItem

                        key={item.id}

                        item={item}

                        onIncrease={increaseQuantity}

                        onDecrease={decreaseQuantity}

                        onRemove={removeFromCart}

                    />

                ))

            }

            <div className="cart-total">

                <h2>

                    Tổng tiền:

                    {" "}

                    {Number(totalPrice).toLocaleString()} đ

                </h2>

                <Link to="/checkout">

                    <button>

                        Thanh toán

                    </button>

                </Link>

            </div>

        </div>

    );

};

export default Cart;