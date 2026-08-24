import { useEffect, useState } from "react";
import orderApi from "../../../api/orderApi";

const OrderManagement = () => {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response = await orderApi.getAll();

                setOrders(response.data?.data || []);

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

            (order._id || order.id) === id

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

                    <tr key={order._id || order.id}>

                        <td>{order._id || order.id}</td>

                        <td>{order.user?.name || order.shippingAddress?.fullName}</td>

                        <td>

                            {Number(order.totalAmount).toLocaleString()} đ

                        </td>

                        <td>

                            <select

                                value={order.orderStatus}

                                onChange={(e) =>
                                    handleStatus(
                                        order._id || order.id,
                                        e.target.value
                                    )
                                }

                            >

                                <option value="pending">

                                    Đang xử lý

                                </option>

                                <option value="shipping">

                                    Đang giao

                                </option>

                                <option value="delivered">

                                    Hoàn thành

                                </option>

                                <option value="cancelled">

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