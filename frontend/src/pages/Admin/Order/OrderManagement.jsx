import { useState } from "react";

import "./OrderManagement.css";


const OrderManagement = () => {


    const [orders,setOrders] = useState([

        {
            id:"ORD001",

            customer:"Nguyễn Văn A",

            phone:"0123456789",

            total:8990000,

            status:"Chờ xử lý"

        },


        {
            id:"ORD002",

            customer:"Trần Văn B",

            phone:"0987654321",

            total:18990000,

            status:"Đang giao"

        },


        {
            id:"ORD003",

            customer:"Lê Văn C",

            phone:"0909090909",

            total:10990000,

            status:"Đã giao"

        }

    ]);



    const handleStatusChange = (id,status)=>{


        setOrders(

            orders.map(order =>

                order.id === id

                ?

                {

                    ...order,

                    status:status

                }

                :

                order

            )

        );


    };



    return (

        <div className="order-management">


            <h1>

                Quản lý đơn hàng

            </h1>



            <table>


                <thead>

                    <tr>

                        <th>
                            Mã đơn
                        </th>


                        <th>
                            Khách hàng
                        </th>


                        <th>
                            Số điện thoại
                        </th>


                        <th>
                            Tổng tiền
                        </th>


                        <th>
                            Trạng thái
                        </th>


                    </tr>

                </thead>



                <tbody>


                {

                    orders.map(order => (

                        <tr key={order.id}>


                            <td>

                                {order.id}

                            </td>



                            <td>

                                {order.customer}

                            </td>



                            <td>

                                {order.phone}

                            </td>



                            <td>

                                {
                                order.total.toLocaleString()
                                }

                                đ

                            </td>



                            <td>


                                <select

                                    value={order.status}

                                    onChange={(e)=>

                                        handleStatusChange(

                                            order.id,

                                            e.target.value

                                        )

                                    }

                                >

                                    <option>
                                        Chờ xử lý
                                    </option>


                                    <option>
                                        Đang giao
                                    </option>


                                    <option>
                                        Đã giao
                                    </option>


                                    <option>
                                        Đã hủy
                                    </option>


                                </select>


                            </td>


                        </tr>

                    ))

                }


                </tbody>


            </table>


        </div>

    );

};


export default OrderManagement;