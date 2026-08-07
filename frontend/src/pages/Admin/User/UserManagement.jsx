import { useState } from "react";
import "./UserManagement.css";

const UserManagement = () => {

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Nguyễn Văn A",
            email: "a@gmail.com",
            role: "USER",
            status: "Hoạt động"
        },
        {
            id: 2,
            name: "Trần Văn B",
            email: "b@gmail.com",
            role: "ADMIN",
            status: "Hoạt động"
        },
        {
            id: 3,
            name: "Lê Văn C",
            email: "c@gmail.com",
            role: "USER",
            status: "Khóa"
        }
    ]);

    const [search, setSearch] = useState("");

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "USER"
    });

    // ==========================
    // Tìm kiếm
    // ==========================

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    // ==========================
    // Thêm User
    // ==========================

    const addUser = () => {

        if (!newUser.name || !newUser.email) {

            alert("Vui lòng nhập đầy đủ thông tin");

            return;

        }

        setUsers([
            ...users,
            {
                id: Date.now(),
                ...newUser,
                status: "Hoạt động"
            }
        ]);

        setNewUser({
            name: "",
            email: "",
            role: "USER"
        });

    };

    // ==========================
    // Khóa / Mở khóa
    // ==========================

    const handleStatus = (id) => {

        setUsers(

            users.map(user =>

                user.id === id
                    ? {
                        ...user,
                        status:
                            user.status === "Hoạt động"
                                ? "Khóa"
                                : "Hoạt động"
                    }
                    : user

            )

        );

    };

    // ==========================
    // Xóa User
    // ==========================

    const deleteUser = (id) => {

        if (window.confirm("Bạn có chắc muốn xóa người dùng?")) {

            setUsers(users.filter(user => user.id !== id));

        }

    };

    // ==========================
    // Sửa User
    // ==========================

    const editUser = (user) => {

        const name = prompt("Nhập họ tên:", user.name);

        if (!name) return;

        const email = prompt("Nhập email:", user.email);

        if (!email) return;

        const role = prompt("Role (USER hoặc ADMIN):", user.role);

        if (!role) return;

        setUsers(

            users.map(item =>

                item.id === user.id

                    ? {
                        ...item,
                        name,
                        email,
                        role
                    }

                    : item

            )

        );

    };

    return (

        <div className="user-management">

            <h1>Quản lý người dùng</h1>

            {/* Form thêm User */}

            <div className="add-user">

                <input
                    type="text"
                    placeholder="Họ tên"
                    value={newUser.name}
                    onChange={(e) =>
                        setNewUser({
                            ...newUser,
                            name: e.target.value
                        })
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser({
                            ...newUser,
                            email: e.target.value
                        })
                    }
                />

                <select
                    value={newUser.role}
                    onChange={(e) =>
                        setNewUser({
                            ...newUser,
                            role: e.target.value
                        })
                    }
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <button onClick={addUser}>
                    Thêm User
                </button>

            </div>

            {/* Tìm kiếm */}

            <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-box"
            />

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

                        filteredUsers.map(user => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>{user.status}</td>

                                <td>

                                    <button
                                        onClick={() => editUser(user)}
                                    >
                                        Sửa
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Xóa
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() => handleStatus(user.id)}
                                    >
                                        {
                                            user.status === "Hoạt động"
                                                ? "Khóa"
                                                : "Mở khóa"
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