import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {

    const data = {

        products: 120,

        users: 58,

        orders: 36,

        revenue: 185600000

    };

    return (

        <div className="dashboard">

            <h1>

                Dashboard Admin

            </h1>

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

                    <h3>

                        {data.revenue.toLocaleString()} đ

                    </h3>

                    <p>Doanh thu</p>

                </div>

            </div>

            <div className="dashboard-menu">

                <Link to="/admin/products">

                    <button>

                        Quản lý sản phẩm

                    </button>

                </Link>

                <Link to="/admin/orders">

                    <button>

                        Quản lý đơn hàng

                    </button>

                </Link>

                <Link to="/admin/users">

                    <button>

                        Quản lý người dùng

                    </button>

                </Link>

                <Link to="/admin/brands">

                    <button>

                        Quản lý thương hiệu

                    </button>

                </Link>

            </div>

        </div>

    );

};

export default Dashboard;