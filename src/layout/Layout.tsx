import { Outlet } from "react-router";
import Footer from "./Footer.tsx";
import NavBar from "./NavBar.tsx";

export default function Layout() {
    return (
        <div className="layout-container flex flex-col min-h-screen justify-between">
            <NavBar/>
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}