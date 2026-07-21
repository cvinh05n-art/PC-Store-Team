import { useAuth } from "../../contexts/AuthContext";

const Home = () => {

    const { user, logout } = useAuth();

    return (

        <div style={{ padding: "40px" }}>

            <h1>Computer Store</h1>

            <hr />

            <h2>Xin chào</h2>

            <p>{user?.fullName}</p>

            <p>{user?.email}</p>

            <button onClick={logout}>

                Đăng xuất

            </button>

        </div>

    );

};

export default Home;