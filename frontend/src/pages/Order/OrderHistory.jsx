import "./Order.css";
import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";

const OrderHistory = ()=>{

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    useEffect(() => {

    const fetchOrders = async () => {

        try {

            const response = await orderApi.getMyOrders();

            setOrders(response.data);

        }
        catch (error) {

            console.log(
                "Lỗi lấy đơn hàng:",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };

    fetchOrders();

    }, []);
    if (loading) {

    return <h2>Đang tải đơn hàng...</h2>;

    }if (orders.length === 0) {

    return (

        <div className="order-history">

            <h1>Lịch sử đơn hàng</h1>

            <p>Bạn chưa có đơn hàng nào.</p>

        </div>

    );

    }
    if (orders.length === 0) {

    return (

        <div className="order-history">

            <h1>Lịch sử đơn hàng</h1>

            <p>Bạn chưa có đơn hàng nào.</p>

        </div>

    );

    }
    return (

        <div className="order-history">


            <h1>

                Lịch sử đơn hàng

            </h1>



            {

                orders.map(order=>(


                    <div

                        className="order-card"

                        key={order.id}

                    >


                        <h3>

                            Mã đơn:

                            {" "}

                            {order.id}

                        </h3>



                        <p>

                            Ngày đặt:

                            {" "}

                            {new Date(order.createdAt).toLocaleDateString()}

                        </p>

                        <h4>Sản phẩm:</h4>

                            {(order.items || []).map((product, index) => (

                            <p key={index}>

                        {product.name} x {product.quantity}

                        </p>

                        ))}

                        <p>

                            Tổng tiền:

                            {" "}

                            {Number(order.totalPrice).toLocaleString()} đ

                            </p>

                        <p>

                            Trạng thái:

                            {" "}

                            {order.status}

                        </p>


                    </div>


                ))

            }


        </div>

    );

};

export default OrderHistory;