import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-column">

                    <div className="footer-logo">

                        <div className="logo-icon">
                            PC
                        </div>

                        <strong>
                            PC STORE
                        </strong>

                    </div>

                    <p>
                        Cửa hàng máy tính và linh kiện
                        công nghệ chất lượng cao.
                    </p>

                </div>

                <div className="footer-column">

                    <h3>Liên kết</h3>

                    <Link to="/">
                        Trang chủ
                    </Link>

                    <Link to="/products">
                        Sản phẩm
                    </Link>

                    <Link to="/cart">
                        Giỏ hàng
                    </Link>

                </div>

                <div className="footer-column">

                    <h3>Hỗ trợ</h3>

                    <Link to="/contact">
                        Liên hệ
                    </Link>

                    <Link to="/policy">
                        Chính sách
                    </Link>

                    <Link to="/shipping-policy">
                        Chính sách giao hàng
                    </Link>

                </div>

                <div className="footer-column">

                    <h3>Thông tin</h3>

                    <p>
                        📍 Trà Vinh, Việt Nam
                    </p>

                    <p>
                        ☎ 0383 415 367
                    </p>

                    <p>
                        ✉ cvinh05n@gmail.com
                    </p>

                </div>

            </div>

            <div className="footer-bottom">

                © 2026 PC STORE. All rights reserved.

            </div>

        </footer>

    );
};

export default Footer;