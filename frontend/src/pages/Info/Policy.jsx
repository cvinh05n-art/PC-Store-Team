import { Link } from "react-router-dom";
import "./Info.css";

const Policy = () => {
    return (
        <div className="info-page">

            <div className="info-container">

                <div className="info-header">
                    <span>PC STORE</span>
                    <h1>Chính sách</h1>
                    <p>
                        Các quy định và chính sách áp dụng
                        tại PC Store.
                    </p>
                </div>

                <div className="policy-list">

                    <section className="info-section">
                        <h2>1. Chính sách bảo hành</h2>

                        <p>
                            Sản phẩm được bảo hành theo chính sách
                            của nhà sản xuất hoặc theo điều kiện
                            bảo hành được ghi trên thông tin sản phẩm.
                        </p>

                        <p>
                            Khách hàng cần cung cấp thông tin đơn hàng
                            hoặc hóa đơn khi yêu cầu bảo hành.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>2. Chính sách đổi trả</h2>

                        <p>
                            Sản phẩm có lỗi kỹ thuật hoặc không đúng
                            với thông tin đơn hàng có thể được hỗ trợ
                            đổi trả theo điều kiện của PC Store.
                        </p>

                        <p>
                            Sản phẩm cần giữ nguyên tình trạng,
                            phụ kiện và bao bì khi gửi đổi trả.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>3. Chính sách thanh toán</h2>

                        <p>
                            Khách hàng có thể thanh toán theo các
                            phương thức được cung cấp tại trang
                            thanh toán của hệ thống.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>4. Chính sách bảo mật</h2>

                        <p>
                            PC Store sử dụng thông tin khách hàng cho
                            mục đích xử lý đơn hàng, hỗ trợ khách hàng
                            và cải thiện chất lượng dịch vụ.
                        </p>
                    </section>

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

export default Policy;