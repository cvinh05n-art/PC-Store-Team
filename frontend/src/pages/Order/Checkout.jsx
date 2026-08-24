import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import orderApi from "../../api/orderApi";
import "./Order.css";

const Checkout = () => {

    const navigate = useNavigate();

    const {
        cart,
        clearCart,
        totalPrice
    } = useCart();

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });

    };

    const validateForm = () => {

        if (!customer.name.trim()) {
            alert("Vui lòng nhập họ tên.");
            return false;
        }

        if (!/^0\d{9}$/.test(customer.phone)) {
            alert("Số điện thoại không hợp lệ.");
            return false;
        }

        if (!customer.address.trim()) {
            alert("Vui lòng nhập địa chỉ.");
            return false;
        }

        if (cart.length === 0) {
            alert("Giỏ hàng đang trống.");
            return false;
        }

        return true;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        const order = {
            items: cart.map((item) => ({
                product: item.productId || item.product?._id || item.product?.id,
                quantity: Number(item.quantity)
            })),
            shippingAddress: {
                fullName: customer.name,
                phone: customer.phone,
                address: customer.address
            },
            paymentMethod: "COD"
        };

        try {

            await orderApi.create(order);

            await clearCart();

            setCustomer({
                name: "",
                phone: "",
                address: ""
            });

            alert("🎉 Đặt hàng thành công!");

            navigate("/orders");

        }
        catch (error) {

            console.error("Lỗi tạo đơn hàng:", error);

            alert("Đặt hàng thất bại. Vui lòng thử lại.");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="checkout">

            <h1>Thanh toán</h1>

            <form onSubmit={handleSubmit}>

                <label>Họ tên</label>

                <input
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    placeholder="Nhập họ tên"
                />

                <label>Số điện thoại</label>

                <input
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                />

                <label>Địa chỉ</label>

                <textarea
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ"
                />

                <div className="checkout-summary">

                    <h2>
                        Tổng tiền:
                        {" "}
                        {Number(totalPrice).toLocaleString("vi-VN")} đ
                    </h2>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Đang xử lý..."
                        : "Xác nhận đặt hàng"}

                </button>

            </form>

        </div>

    );

};

export default Checkout;