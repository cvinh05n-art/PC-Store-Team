import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {

    const data = {
        products: 120,
        users: 58,
        orders: 36,
        revenue: 185600000
    };

    const today = new Date().toLocaleDateString("vi-VN");

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>

                    <h1>Dashboard Admin</h1>

                    <p>Xin chào Admin 👋</p>

                </div>

                <div className="dashboard-date">

                    <span>{today}</span>

                </div>

            </div>

            {/* Thống kê */}

            <div className="dashboard-cards">

                <div className="card">

                    <h2>📦</h2>

                    <h3>{data.products}</h3>

                    <p>Sản phẩm</p>

                </div>

                <div className="card">

                    <h2>👤</h2>

                    <h3>{data.users}</h3>

                    <p>Người dùng</p>

                </div>

                <div className="card">

                    <h2>🛒</h2>

                    <h3>{data.orders}</h3>

                    <p>Đơn hàng</p>

                </div>

                <div className="card">

                    <h2>💰</h2>

                    <h3>{data.revenue.toLocaleString()} đ</h3>

                    <p>Doanh thu</p>

                </div>

            </div>

            {/* Truy cập nhanh */}

            <div className="dashboard-menu">

                <Link to="/admin/products">

                    <button>📦 Quản lý sản phẩm</button>

                </Link>

                <Link to="/admin/orders">

                    <button>🛒 Quản lý đơn hàng</button>

                </Link>

                <Link to="/admin/users">

                    <button>👤 Quản lý người dùng</button>

                </Link>

                <Link to="/admin/brands">

                    <button>🏷️ Quản lý thương hiệu</button>

                </Link>

            </div>

            {/* Thông tin */}

            <div className="dashboard-info">

                <div className="info-box">

                    <h2>Hoạt động gần đây</h2>

                    <ul>

                        <li>✔ Có 5 đơn hàng mới.</li>

                        <li>✔ Thêm 2 sản phẩm mới.</li>

                        <li>✔ Có 3 người dùng đăng ký.</li>

                        <li>✔ 1 tài khoản bị khóa.</li>

                    </ul>

                </div>

                <div className="info-box">

                    <h2>Trạng thái hệ thống</h2>

                    <p>

                        API:
                        <span className="success"> Đang hoạt động</span>

                    </p>

                    <p>

                        Database:
                        <span className="success"> MongoDB Connected</span>

                    </p>

                    <p>

                        Server:
                        <span className="success"> Online</span>

                    </p>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;