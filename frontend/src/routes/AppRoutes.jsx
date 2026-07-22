import { Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";

import Register from "../pages/Auth/Register";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home/Home";

import Profile from "../pages/Profile/Profile";

import ChangePassword from "../pages/ChangePassword/ChangePassword";

import ForgotPassword from "../pages/Auth/ForgotPassword";

import ProductDetail from "../pages/Product/ProductDetail";

import ProductForm from "../pages/Product/ProductForm";

const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route path="/profile" 
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route path="/change-password"
                element={
                    <ProtectedRoute>
                        <ChangePassword />
                    </ProtectedRoute>
                }
            />

            <Route path="/forgot-password"
                element={<ForgotPassword />}
            />
            
            <Route path="/products/:id"
                element={<ProductDetail />}
            />

            <Route
                path="/admin/products/create"
                element={<ProductForm />}
            />
        </Routes>

    );

};

export default AppRoutes;