import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout, isAuthenticated } = useAuth();

    const { cart } = useCart();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="navbar">

            <div className="logo">

                <Link to="/">

                    PC STORE

                </Link>

            </div>

            <div className="menu">

                <Link to="/">

                    Trang chủ

                </Link>

                <Link to="/products">

                    Sản phẩm

                </Link>

                <Link to="/cart">

                    🛒 Giỏ hàng

                    {

                        cart.length > 0 &&

                        (

                            <span className="cart-count">

                                {cart.length}

                            </span>

                        )

                    }

                </Link>

            </div>

            <div className="account">

            {

                isAuthenticated

                ?

                <>

                    <Link to="/profile">

                        👤

                        {

                            user?.fullName

                            ?

                            user.fullName

                            :

                            "Tài khoản"

                        }

                    </Link>

                    {

                        user?.role === "ADMIN"

                        &&

                        (

                            <Link to="/admin">

                                Admin

                            </Link>

                        )

                    }

                    <button

                        onClick={handleLogout}

                    >

                        Đăng xuất

                    </button>

                </>

                :

                <>

                    <Link to="/login">

                        Đăng nhập

                    </Link>


                    <Link to="/register">

                        Đăng ký

                    </Link>


                </>
            }

            </div>

        </nav>

    );

};

export default Navbar;