import { Link, Outlet, useLocation } from "react-router";
import Footer from "../footer/Footer";

export default function Layout() {
    const location = useLocation().pathname;

    return (
        <div className="layout-container">
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
