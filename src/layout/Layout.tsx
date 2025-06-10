import { Link, Outlet, useLocation } from "react-router";
import Footer from "../footer/Footer";

export default function Layout() {
    const location = useLocation().pathname;

    return (
        <div className="layout-container flex flex-col min-h-screen justify-between">
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
