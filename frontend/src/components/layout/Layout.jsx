import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import "./Layout.css";

const Layout = () => {
    return (
        <div className="site-layout">

            <Navbar />

            <main className="site-content">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
};

export default Layout;