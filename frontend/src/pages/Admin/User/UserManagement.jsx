import { useState } from "react";

import "./UserManagement.css";

const UserManagement = () => {

    const [users,setUsers] = useState([

        {
            id:1,

            name:"Nguyễn Văn A",

            email:"a@gmail.com",

            role:"USER",

            status:"Hoạt động"

        },


        {
            id:2,

            name:"Trần Văn B",

            email:"b@gmail.com",

            role:"ADMIN",

            status:"Hoạt động"

        },


        {
            id:3,

            name:"Lê Văn C",

            email:"c@gmail.com",

            role:"USER",

            status:"Khóa"

        }

    ]);

    const handleStatus = (id)=>{

        setUsers(

            users.map(user =>

                user.id === id

                ?

                {

                    ...user,

                    status:

                    user.status === "Hoạt động"

                    ?

                    "Khóa"

                    :

                    "Hoạt động"

                }


                :

                user


            )

        );


    };

    return (

        <div className="user-management">

            <h1>

                Quản lý người dùng

            </h1>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Họ tên</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Trạng thái</th>

                        <th>Thao tác</th>

                    </tr>

                </thead>

                <tbody>

                {

                    users.map(user=>(

                        <tr key={user.id}>

                            <td>
                                {user.id}
                            </td>

                            <td>
                                {user.name}
                            </td>

                            <td>
                                {user.email}
                            </td>

                            <td>
                                {user.role}
                            </td>

                            <td>
                                {user.status}
                            </td>

                            <td>

                                <button

                                    onClick={()=>
                                        handleStatus(user.id)
                                    }

                                >

                                    {
                                        user.status === "Hoạt động"

                                        ?

                                        "Khóa"

                                        :

                                        "Mở khóa"
                                    }

                                </button>

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    );

};

export default UserManagement;