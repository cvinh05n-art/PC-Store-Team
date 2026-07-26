import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {

    const { user, isAuthenticated, logout } = useAuth();

    return (

        <nav className="navbar">

            <div className="logo">

                <Link to="/">Computer Store</Link>

            </div>

            <div className="menu">

                <Link to="/">Trang chủ</Link>

                <Link to="/products">Sản phẩm</Link>

                <Link to="/cart">Giỏ hàng</Link>

                <Link to="/profile">Hồ sơ</Link>

                <Link to="/change-password">Đổi mật khẩu</Link>

            </div>

            <div className="user-info">

                {

                    isAuthenticated ? (

                        <>

                           <Link to="/profile">

                                Xin chào

                                <strong> {user?.fullName}</strong>

                            </Link>

                            <button onClick={logout}>

                                Đăng xuất

                            </button>

                        </>

                    ) : (

                        <>

                            <Link to="/login">

                                Đăng nhập

                            </Link>

                        </>

                    )

                }

            </div>

        </nav>

    );

};

export default Navbar;