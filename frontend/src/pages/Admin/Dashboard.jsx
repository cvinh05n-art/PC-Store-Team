import Navbar from "../../components/layout/Navbar";

import "./Dashboard.css";


const Dashboard = () => {


    const stats = [

        {
            title:"Tổng sản phẩm",

            value:120

        },


        {
            title:"Tổng đơn hàng",

            value:56

        },


        {
            title:"Người dùng",

            value:320

        },


        {
            title:"Doanh thu",

            value:"250.000.000 đ"

        }

    ];



    return (

        <>


            <Navbar />


            <div className="dashboard">


                <h1>

                    Admin Dashboard

                </h1>



                <div className="dashboard-grid">


                    {

                        stats.map((item,index)=>(


                            <div

                                className="stat-card"

                                key={index}

                            >


                                <h3>

                                    {item.title}

                                </h3>



                                <p>

                                    {item.value}

                                </p>


                            </div>


                        ))

                    }


                </div>



            </div>


        </>

    );

};


export default Dashboard;