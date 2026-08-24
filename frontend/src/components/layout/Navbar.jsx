import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import "./Navbar.css";

const Navbar = () => {

    const { user, isAuthenticated, logout } = useAuth();
    const { cart } = useCart();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="navbar">

            <div className="navbar-container">

                {/* LOGO */}

                <Link to="/" className="navbar-logo">

                    <div className="logo-icon">
                        PC
                    </div>

                    <div className="logo-text">
                        <strong>PC STORE</strong>
                        <span>Computer & Technology</span>
                    </div>

                </Link>

                {/* MENU */}

                <nav className="navbar-menu">

                    <Link to="/">
                        Trang chủ
                    </Link>

                    <Link to="/products">
                        Sản phẩm
                    </Link>

                    <Link to="/brands">
                        Thương hiệu
                    </Link>

                    {isAuthenticated && (
                        <Link to="/orders">
                            Đơn hàng
                        </Link>
                    )}

                </nav>

                {/* RIGHT */}

                <div className="navbar-actions">

                    <Link to="/cart" className="cart-link">

                        🛒

                        {cart?.length > 0 && (
                            <span className="cart-count">
                                {cart.length}
                            </span>
                        )}

                    </Link>

                    {isAuthenticated ? (

                        <div className="user-menu">

                            <Link to="/profile">
                                👤 {user?.name || user?.email}
                            </Link>

                            {user?.role === "ADMIN" && (
                                <Link to="/admin">
                                    ⚙️ Admin
                                </Link>
                            )}

                            <button onClick={handleLogout}>
                                Đăng xuất
                            </button>

                        </div>

                    ) : (

                        <div className="auth-links">

                            <Link to="/login">
                                Đăng nhập
                            </Link>

                            <Link
                                to="/register"
                                className="register-button"
                            >
                                Đăng ký
                            </Link>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
};

export default Navbar;