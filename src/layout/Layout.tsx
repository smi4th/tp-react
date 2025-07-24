import { Outlet } from "react-router";
import Footer from "./Footer.tsx";
import NavBar from "./NavBar.tsx";
import { ThemeProvider } from "@context/ThemeContext.tsx";

export default function Layout() {
    return (
        <div className="layout-container flex flex-col min-h-screen justify-between">
            <ThemeProvider>
            <NavBar/>
            <div className="content">
                <Outlet />
            </div>
            <Footer />
            </ThemeProvider>
        </div>
    );
}