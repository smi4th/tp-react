import styles from "./layout.module.css"
import brandLogo from "@assets/logo.png"
import {Link} from "react-router";

export default function NavBar() {
    return (
        <>
            <div className={styles.mainNavBar}>
                <img src={brandLogo} className={styles.logo} alt="brand-logo"></img>
                <div className={styles.brandName}>
                    <Link to="/">LockIn</Link>
                </div>
                <div className={styles.allTitles}>
                    <div className={styles.navBarTitles}>
                        <Link to="/">Home</Link>
                    </div>
                    <div className={styles.navBarTitles}>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className={styles.navBarTitles}>
                        <Link to="/reservation">Réserver</Link>
                    </div>
                </div>
            </div>

        </>
    )
}
