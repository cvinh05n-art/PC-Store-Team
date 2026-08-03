import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import orderApi from "../../api/orderApi";
import "./Order.css";

const Checkout = () => {

    const navigate = useNavigate();

    const {
        cart,
        clearCart
    } = useCart();

    const [customer, setCustomer] = useState({

        name: "",

        phone: "",

        address: ""

    });

    const handleChange = (e) => {

        setCustomer({

            ...customer,

            [e.target.name]: e.target.value

        });

    };

    const total = cart.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    );

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (cart.length === 0) {

            alert("Giỏ hàng đang trống");

            return;

        }

        const order = {

            customer,

            products: cart,

            total,

            status: "Đang xử lý"

        };

        try {

            await orderApi.create(order);

            await clearCart();

            alert("Đặt hàng thành công");

            navigate("/orders");

        }
        catch (error) {

            console.log("Lỗi tạo đơn hàng:", error);

            alert("Đặt hàng thất bại");

        }

    };

    return (

        <div className="checkout">

            <h1>Thanh toán</h1>

            <form onSubmit={handleSubmit}>

                <label>Họ tên</label>

                <input
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    placeholder="Nhập họ tên"
                    required
                />

                <label>Số điện thoại</label>

                <input
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    required
                />

                <label>Địa chỉ</label>

                <textarea
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ"
                    required
                />

                <h2>

                    Tổng tiền: {Number(total).toLocaleString()} đ

                </h2>

                <button type="submit">

                    Xác nhận đặt hàng

                </button>

            </form>

        </div>

    );

};

export default Checkout;