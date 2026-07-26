import { useCart } from "../../context/CartContext";

import CartItem from "../../components/cart/CartItem";

import { Link } from "react-router-dom";

import "./Cart.css";


const Cart = () => {


    const {

        cart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        totalPrice

    } = useCart();



    if(cart.length === 0){


        return (

            <div className="cart-empty">

                <h1>
                    Giỏ hàng trống
                </h1>


                <p>
                    Chưa có sản phẩm nào trong giỏ hàng
                </p>


                <Link to="/">

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

                    {totalPrice.toLocaleString()} đ

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