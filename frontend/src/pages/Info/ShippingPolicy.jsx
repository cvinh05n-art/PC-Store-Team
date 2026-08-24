import { Link } from "react-router-dom";
import "./Info.css";

const ShippingPolicy = () => {
    return (
        <div className="info-page">

            <div className="info-container">

                <div className="info-header">
                    <span>PC STORE</span>
                    <h1>Chính sách giao hàng</h1>
                    <p>
                        Thông tin về thời gian và quy trình
                        giao nhận đơn hàng.
                    </p>
                </div>

                <section className="info-section">
                    <h2>1. Khu vực giao hàng</h2>

                    <p>
                        PC Store hỗ trợ giao hàng đến các khu vực
                        được hệ thống vận chuyển phục vụ.
                    </p>
                </section>

                <section className="info-section">
                    <h2>2. Thời gian giao hàng</h2>

                    <p>
                        Thời gian giao hàng dự kiến sẽ phụ thuộc
                        vào địa chỉ nhận hàng và đơn vị vận chuyển.
                    </p>

                    <p>
                        Khách hàng có thể theo dõi trạng thái đơn hàng
                        trong mục <strong>Đơn hàng</strong>.
                    </p>
                </section>

                <section className="info-section">
                    <h2>3. Kiểm tra khi nhận hàng</h2>

                    <p>
                        Khách hàng nên kiểm tra tình trạng kiện hàng
                        và sản phẩm ngay khi nhận.
                    </p>

                    <p>
                        Nếu phát hiện sản phẩm bị hư hỏng hoặc sai
                        thông tin, vui lòng liên hệ PC Store sớm nhất.
                    </p>
                </section>

                <section className="info-section">
                    <h2>4. Hỗ trợ giao hàng</h2>

                    <p>
                        Mọi vấn đề liên quan đến giao hàng có thể
                        liên hệ qua số <strong>0383 415 367</strong>
                        hoặc email <strong>cvinh05n@gmail.com</strong>.
                    </p>
                </section>

                <div className="info-back">
                    <Link to="/">
                        ← Về trang chủ
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default ShippingPolicy;