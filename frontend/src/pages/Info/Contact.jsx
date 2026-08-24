import { Link } from "react-router-dom";
import "./Info.css";

const Contact = () => {
    return (
        <div className="info-page">

            <div className="info-container">

                <div className="info-header">
                    <span>PC STORE</span>
                    <h1>Liên hệ</h1>
                    <p>
                        PC Store luôn sẵn sàng hỗ trợ bạn trong
                        quá trình mua sắm và sử dụng sản phẩm.
                    </p>
                </div>

                <div className="info-grid">

                    <div className="info-card">
                        <div className="info-icon">📍</div>
                        <h3>Địa chỉ</h3>
                        <p>
                            Trà Vinh, Việt Nam
                        </p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">☎️</div>
                        <h3>Điện thoại</h3>
                        <p>
                            0383 415 367
                        </p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">✉️</div>
                        <h3>Email</h3>
                        <p>
                            cvinh05n@gmail.com
                        </p>
                    </div>

                </div>

                <div className="info-section">

                    <h2>Hỗ trợ khách hàng</h2>

                    <p>
                        Bạn có thể liên hệ với PC Store để được hỗ trợ
                        về sản phẩm, đơn hàng, thanh toán, giao hàng
                        hoặc các vấn đề liên quan đến tài khoản.
                    </p>

                    <p>
                        Thời gian hỗ trợ:
                        <strong> 08:00 - 22:00</strong>
                        {" "}mỗi ngày.
                    </p>

                </div>

                <div className="info-back">
                    <Link to="/">
                        ← Về trang chủ
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default Contact;