import {Link, Outlet, useLocation} from "react-router";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";
import styles from "./layout.module.css"

export default function Layout() {

    const location = useLocation().pathname;

    return (
        <>
            <div className={styles.main}>
                <NavBar />
                <Outlet/>
                <Footer />
            </div>
        </>
    );
}