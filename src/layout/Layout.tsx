import { Outlet } from "react-router";
import Footer from "../footer/Footer";

export default function Layout() {
    return (
        <div className="layout-container flex flex-col min-h-screen justify-between">
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}