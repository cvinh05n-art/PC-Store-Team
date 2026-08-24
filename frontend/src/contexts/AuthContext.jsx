import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {

            try {

                const parsedUser = JSON.parse(userData);

                setUser(parsedUser);
                setIsAuthenticated(true);

            } catch (error) {

                console.error(
                    "Lỗi đọc thông tin user:",
                    error
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

            }

        }

        setLoading(false);

    }, []);

    const login = (userData, token) => {

        console.log("LOGIN USER:", userData);
        console.log("LOGIN TOKEN:", token);

        if (!token) {

            console.error(
                "Không nhận được token!"
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

        setUser(userData);
        setIsAuthenticated(true);

        return true;
    };

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

export const useAuth = () =>
    useContext(AuthContext);