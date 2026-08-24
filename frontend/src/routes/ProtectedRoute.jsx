import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";


const ProtectedRoute = ({
    children,
    role
}) => {

    const {
        user,
        loading,
        isAuthenticated
    } = useAuth();

    const location = useLocation();


    // =========================
    // ĐANG KIỂM TRA SESSION
    // =========================

    if (loading) {

        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                Đang kiểm tra đăng nhập...
            </div>
        );

    }


    // =========================
    // CHƯA LOGIN
    // =========================

    if (!isAuthenticated) {

        return (

            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname
                }}
            />

        );

    }


    // =========================
    // CHECK ROLE
    // =========================

    if (role) {

        const userRole =
            user?.role?.toUpperCase();

        const requiredRole =
            role.toUpperCase();


        if (userRole !== requiredRole) {

            return (

                <Navigate
                    to="/"
                    replace
                />

            );

        }

    }


    // =========================
    // OK
    // =========================

    return children;

};


export default ProtectedRoute;