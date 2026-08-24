import { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import "./UserManagement.css";

const UserManagement = () => {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });


    // =========================
    // LOAD USERS
    // =========================

    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await userApi.getUsers(search);

            const result =
                response.data;

            if (!result.success) {
                throw new Error(
                    result.message ||
                    "Không thể lấy danh sách người dùng"
                );
            }

            setUsers(
                Array.isArray(result.data)
                    ? result.data
                    : []
            );

        } catch (err) {

            console.error(
                "Load users error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Không thể tải danh sách người dùng"
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // LOAD FIRST TIME
    // =========================

    useEffect(() => {

        loadUsers();

    }, []);


    // =========================
    // SEARCH
    // =========================

    const handleSearch = async (e) => {

        e.preventDefault();

        await loadUsers();

    };


    // =========================
    // ADD USER
    // =========================

    const addUser = async () => {

        if (
            !newUser.name.trim() ||
            !newUser.email.trim() ||
            !newUser.password
        ) {

            alert(
                "Vui lòng nhập họ tên, email và mật khẩu"
            );

            return;
        }

        try {

            setSaving(true);

            const response =
                await userApi.createUser({
                    name:
                        newUser.name.trim(),
                    email:
                        newUser.email.trim(),
                    password:
                        newUser.password,
                    role:
                        newUser.role
                });

            const result =
                response.data;

            if (!result.success) {

                throw new Error(
                    result.message ||
                    "Không thể tạo người dùng"
                );
            }

            alert(
                "Tạo người dùng thành công"
            );

            setNewUser({
                name: "",
                email: "",
                password: "",
                role: "USER"
            });

            await loadUsers();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                err?.message ||
                "Không thể tạo người dùng"
            );

        } finally {

            setSaving(false);

        }
    };


    // =========================
    // EDIT USER
    // =========================

    const editUser = async (user) => {

        const name =
            window.prompt(
                "Nhập họ tên:",
                user.name
            );

        if (!name || !name.trim()) {
            return;
        }

        const email =
            window.prompt(
                "Nhập email:",
                user.email
            );

        if (!email || !email.trim()) {
            return;
        }

        const role =
            window.prompt(
                "Role (USER hoặc ADMIN):",
                user.role
            );

        if (!role) {
            return;
        }

        try {

            const response =
                await userApi.updateUser(
                    user.id,
                    {
                        name: name.trim(),
                        email: email.trim(),
                        role: role.toUpperCase()
                    }
                );

            const result =
                response.data;

            if (!result.success) {

                throw new Error(
                    result.message ||
                    "Không thể cập nhật user"
                );
            }

            await loadUsers();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                err?.message ||
                "Không thể cập nhật user"
            );

        }
    };


    // =========================
    // LOCK / UNLOCK
    // =========================

    const handleStatus = async (user) => {

        const action =
            user.status
                ? "khóa"
                : "mở khóa";

        const confirmed =
            window.confirm(
                `Bạn có chắc muốn ${action} tài khoản ${user.email}?`
            );

        if (!confirmed) {
            return;
        }

        try {

            const response =
                await userApi.toggleUserStatus(
                    user.id
                );

            const result =
                response.data;

            if (!result.success) {

                throw new Error(
                    result.message ||
                    "Không thể thay đổi trạng thái"
                );
            }

            await loadUsers();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                err?.message ||
                "Không thể thay đổi trạng thái"
            );

        }
    };


    // =========================
    // DELETE
    // =========================

    const deleteUser = async (user) => {

        const confirmed =
            window.confirm(
                `Bạn có chắc muốn xóa ${user.email}?`
            );

        if (!confirmed) {
            return;
        }

        try {

            const response =
                await userApi.deleteUser(
                    user.id
                );

            const result =
                response.data;

            if (!result.success) {

                throw new Error(
                    result.message ||
                    "Không thể xóa user"
                );
            }

            await loadUsers();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                err?.message ||
                "Không thể xóa user"
            );

        }
    };


    return (

        <div className="user-management">

            <div className="user-management-header">

                <div>

                    <p className="user-eyebrow">
                        ADMIN
                    </p>

                    <h1>
                        Quản lý người dùng
                    </h1>

                    <p>
                        Quản lý tài khoản, quyền và
                        trạng thái người dùng.
                    </p>

                </div>

                <div className="user-total">
                    {users.length} tài khoản
                </div>

            </div>


            {/* =========================
                ADD USER
            ========================= */}

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

                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={newUser.password}
                    onChange={(e) =>
                        setNewUser({
                            ...newUser,
                            password: e.target.value
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

                    <option value="USER">
                        USER
                    </option>

                    <option value="ADMIN">
                        ADMIN
                    </option>

                </select>

                <button
                    onClick={addUser}
                    disabled={saving}
                >
                    {saving
                        ? "Đang thêm..."
                        : "Thêm User"
                    }
                </button>

            </div>


            {/* =========================
                SEARCH
            ========================= */}

            <form
                className="user-search"
                onSubmit={handleSearch}
            >

                <input
                    type="text"
                    placeholder="Tìm theo tên hoặc email..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <button type="submit">
                    Tìm kiếm
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setSearch("");
                        loadUsers();
                    }}
                >
                    Làm mới
                </button>

            </form>


            {/* =========================
                ERROR
            ========================= */}

            {error && (

                <div className="user-error">
                    {error}
                </div>

            )}


            {/* =========================
                TABLE
            ========================= */}

            <div className="user-table-wrapper">

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

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="user-loading"
                                >
                                    Đang tải dữ liệu...
                                </td>

                            </tr>

                        ) : users.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="user-empty"
                                >
                                    Chưa có người dùng.
                                </td>

                            </tr>

                        ) : (

                            users.map((user) => (

                                <tr
                                    key={user.id}
                                >

                                    <td>
                                        {String(
                                            user.id
                                        ).slice(-6)}
                                    </td>

                                    <td>
                                        {user.name}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                user.role === "ADMIN"
                                                    ? "role-admin"
                                                    : "role-user"
                                            }
                                        >
                                            {user.role}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={
                                                user.status
                                                    ? "status-active"
                                                    : "status-locked"
                                            }
                                        >
                                            {user.status
                                                ? "Hoạt động"
                                                : "Khóa"
                                            }
                                        </span>

                                    </td>

                                    <td>

                                        <div className="user-actions">

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    editUser(
                                                        user
                                                    )
                                                }
                                            >
                                                Sửa
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteUser(
                                                        user
                                                    )
                                                }
                                            >
                                                Xóa
                                            </button>

                                            <button
                                                className="status-btn"
                                                onClick={() =>
                                                    handleStatus(
                                                        user
                                                    )
                                                }
                                            >
                                                {user.status
                                                    ? "Khóa"
                                                    : "Mở khóa"
                                                }
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
};

export default UserManagement;