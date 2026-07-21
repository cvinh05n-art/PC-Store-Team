import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section">

                    <h2>Computer Store</h2>

                    <p>
                        Chuyên cung cấp linh kiện và phụ kiện máy tính
                        chính hãng.
                    </p>

                </div>

                <div className="footer-section">

                    <h3>Liên kết</h3>

                    <ul>

                        <li>Trang chủ</li>

                        <li>Sản phẩm</li>

                        <li>Giỏ hàng</li>

                        <li>Liên hệ</li>

                    </ul>

                </div>

                <div className="footer-section">

                    <h3>Thông tin</h3>

                    <p>Email: support@computerstore.com</p>

                    <p>Hotline: 0123 456 789</p>

                    <p>Địa chỉ: Trà Vinh</p>

                </div>

            </div>

            <hr />

            <p className="copyright">

                © 2026 Computer Store. All rights reserved.

            </p>

        </footer>
    );
};

export default Footer;