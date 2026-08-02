import { Routes, Route } from "react-router-dom";

import ProductList from "../pages/Product/ProductList";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

import ForgotPassword from "../pages/Auth/ForgotPassword";

import ProductDetail from "../pages/Product/ProductDetail";

import CategoryForm from "../pages/Category/CategoryForm";

import BrandList from "../pages/Brand/BrandList";
import BrandForm from "../pages/Brand/BrandForm";

import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Order/Checkout";
import OrderHistory from "../pages/Order/OrderHistory";

import Dashboard from "../pages/Admin/Dashboard";

import ProductManagement 
from "../pages/Admin/Product/ProductManagement";

import ProductCreate 
from "../pages/Admin/Product/ProductCreate";

import ProductEdit 
from "../pages/Admin/Product/ProductEdit";

import OrderManagement 
from "../pages/Admin/Order/OrderManagement";

import UserManagement 
from "../pages/Admin/User/UserManagement";

const AppRoutes = () => {

    return (

        <Routes>

            {/* AUTH */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            {/* HOME */}

            <Route

                path="/"

                element={

                    <ProtectedRoute>

                        <Home />

                    </ProtectedRoute>

                }

            />

            {/* USER */}

            <Route

                path="/profile"

                element={

                    <ProtectedRoute>

                        <Profile />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/change-password"

                element={

                    <ProtectedRoute>

                        <ChangePassword />

                    </ProtectedRoute>

                }

            />

            {/* PRODUCT */}

            <Route

                path="/products"

                element={<ProductList />}

            />

            <Route

                path="/products/:id"

                element={<ProductDetail />}

            />

            {/* CART */}

            <Route

                path="/cart"

                element={

                    <ProtectedRoute>

                        <Cart />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/checkout"

                element={

                    <ProtectedRoute>

                        <Checkout />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/orders"

                element={

                    <ProtectedRoute>

                        <OrderHistory />

                    </ProtectedRoute>

                }

            />

            {/* ADMIN CATEGORY */}

            <Route

                path="/admin/categories/create"

                element={

                    <ProtectedRoute role="ADMIN">

                        <CategoryForm />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/admin/categories/edit/:id"

                element={

                    <ProtectedRoute role="ADMIN">

                        <CategoryForm />

                    </ProtectedRoute>

                }

            />

            {/* ADMIN BRAND */}

            <Route

                path="/admin/brands"

                element={

                    <ProtectedRoute role="ADMIN">

                        <BrandList />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/admin/brands/create"

                element={

                    <ProtectedRoute role="ADMIN">

                        <BrandForm />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/admin/brands/edit/:id"

                element={

                    <ProtectedRoute role="ADMIN">

                        <BrandForm />

                    </ProtectedRoute>

                }

            />

            {/* ADMIN PRODUCT */}

            <Route

                path="/admin"

                element={

                    <ProtectedRoute role="ADMIN">

                        <Dashboard />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/admin/products"

                element={

                    <ProtectedRoute role="ADMIN">

                        <ProductManagement />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/admin/products/create"

                element={

                    <ProtectedRoute role="ADMIN">

                        <ProductCreate />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/admin/products/edit/:id"

                element={

                    <ProtectedRoute role="ADMIN">

                        <ProductEdit />

                    </ProtectedRoute>

                }

            />

            {/* ADMIN ORDER */}

            <Route

                path="/admin/orders"

                element={

                    <ProtectedRoute role="ADMIN">

                        <OrderManagement />

                    </ProtectedRoute>

                }

            />

            {/* ADMIN USER */}

            <Route

                path="/admin/users"

                element={

                    <ProtectedRoute role="ADMIN">

                        <UserManagement />

                    </ProtectedRoute>

                }

            />

        </Routes>

    );

};

export default AppRoutes;