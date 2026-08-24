import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    // =========================
    // KIỂM TRA SESSION KHI MỞ APP
    // =========================

    useEffect(() => {

        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {

            try {

                const parsedUser =
                    JSON.parse(userData);

                setUser(parsedUser);
                setIsAuthenticated(true);

            } catch (error) {

                console.error(
                    "Lỗi đọc thông tin user:",
                    error
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setUser(null);
                setIsAuthenticated(false);
            }

        } else {

            setUser(null);
            setIsAuthenticated(false);

        }

        setLoading(false);

    }, []);


    // =========================
    // LOGIN
    // =========================

    const login = (userData, token) => {

        if (!token || !userData) {

            console.error(
                "Login thất bại: thiếu token hoặc user"
            );

            return false;
        }

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        // CỰC KỲ QUAN TRỌNG
        // Cập nhật Context ngay lập tức

        setUser(userData);
        setIsAuthenticated(true);

        return true;
    };


    // =========================
    // LOGOUT
    // =========================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setIsAuthenticated(false);

    };


    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated
            }}
        >

            {children}

        </AuthContext.Provider>

    );
};


export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth phải được sử dụng bên trong AuthProvider"
        );

    }

    return context;
};