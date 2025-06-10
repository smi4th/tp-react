import {Link, Outlet, useLocation} from "react-router";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";
import styles from "./layout.module.css"

export default function Layout() {

    const location = useLocation().pathname;

    return (
        // <div className="layout-container flex flex-col min-h-screen justify-between">
        //     <div className="content">
        //         <Outlet />
        <>
            <div className={styles.main}>
                <NavBar />
                <Outlet/>
                <Footer />
            </div>
        {/*</div>*/}
            </>
    );
}
