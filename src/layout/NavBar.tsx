import styles from "./layout.module.css"
import brandLogo from "../assets/logo.png"
import { Link } from "react-router";

export default function NavBar() {
    return (
        <>
            <div className={styles.mainNavBar}>
                <img src={brandLogo} className={styles.logo} alt="brand-logo"/>
                <div className={styles.brandName}>LockIn</div>
                <div className={styles.allTitles}>
                    <div className={styles.navBarTitles}>Toutes Missions</div>
                    <div className={styles.navBarTitles}>Contact</div>
                    <div className={styles.navBarTitles}>
                        <Link to="/reservation">Réserver</Link>
                    </div>
                </div>
            </div>

        </>
    )
}
