import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dashboardApi from "../../api/dashboardApi";
import "./Dashboard.css";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        dashboardApi.getSummary()
            .then((response) => setData(response.data?.data || null))
            .catch((err) => setError(err.response?.data?.message || "Không thể tải Dashboard"))
            .finally(() => setLoading(false));
    }, []);

    const summary = data?.summary || {};
    const today = new Date().toLocaleDateString("vi-VN");

    if (loading) return <div className="dashboard"><h2>Đang tải Dashboard...</h2></div>;
    if (error) return <div className="dashboard"><h2>{error}</h2></div>;

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div><h1>Dashboard Admin</h1><p>Xin chào Admin 👋</p></div>
                <div className="dashboard-date"><span>{today}</span></div>
            </div>
            <div className="dashboard-cards">
                <div className="card"><h2>📦</h2><h3>{summary.totalProducts || 0}</h3><p>Sản phẩm</p></div>
                <div className="card"><h2>👤</h2><h3>{summary.totalUsers || 0}</h3><p>Người dùng</p></div>
                <div className="card"><h2>🛒</h2><h3>{summary.totalOrders || 0}</h3><p>Đơn hàng</p></div>
                <div className="card"><h2>💰</h2><h3>{Number(summary.totalRevenue || 0).toLocaleString("vi-VN")} đ</h3><p>Doanh thu</p></div>
            </div>
            <div className="dashboard-menu">
                <Link to="/admin/products"><button>📦 Quản lý sản phẩm</button></Link>
                <Link to="/admin/orders"><button>🛒 Quản lý đơn hàng</button></Link>
                <Link to="/admin/users"><button>👤 Quản lý người dùng</button></Link>
                <Link to="/admin/brands"><button>🏷️ Quản lý thương hiệu</button></Link>
            </div>
            <div className="dashboard-info">
                <div className="info-box"><h2>Trạng thái đơn hàng</h2><ul>{Object.entries(data?.orderStatus || {}).map(([status, count]) => <li key={status}>{status}: {count}</li>)}</ul></div>
                <div className="info-box"><h2>Trạng thái hệ thống</h2><p>API: <span className="success"> Đang hoạt động</span></p><p>Database: <span className="success"> MongoDB Connected</span></p><p>Server: <span className="success"> Online</span></p></div>
            </div>
        </div>
    );
};
export default Dashboard;
