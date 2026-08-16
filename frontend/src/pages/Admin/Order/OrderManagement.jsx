import { useEffect, useState } from "react";
import orderApi from "../../../api/orderApi";

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderApi.getAll();
                setOrders(response.data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    const handleStatus = async (id, status) => {
    try {
        await orderApi.updateStatus(id, status);
        setOrders(
           orders.map(order =>
            order.id === id
            ? {
                ...order,
                status
                }
                : order
            )
        );
    }
    catch (error) {
        console.log(error);
        }
    };
    if (loading) {
        return <h2>Đang tải...</h2>;
    }
    return (
    <div className="order-management">
        <h1>Quản lý đơn hàng</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer?.name}</td>
                        <td>
                            {Number(order.totalPrice).toLocaleString()} đ
                        </td>
                        <td>
                            <select
                                value={order.status}
                                onChange={(e) =>
                                    handleStatus(
                                        order.id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="PENDING">
                                    Đang xử lý
                                </option>
                                <option value="SHIPPING">
                                    Đang giao
                                </option>
                                <option value="COMPLETED">
                                    Hoàn thành
                                </option>
                                <option value="CANCELLED">
                                    Đã hủy
                                </option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default OrderManagement;