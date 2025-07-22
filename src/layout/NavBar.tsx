import styles from "./layout.module.css"
import brandLogo from "@assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface UserDetails {
    email: string;
    role: string;
    exp: number;
    iat: number;
}

export default function NavBar() {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const storedUserDetails = localStorage.getItem("userDetails");
        if (storedUserDetails) {
            try {
                const parsedDetails = JSON.parse(storedUserDetails);
                const expiresAt = localStorage.getItem("expiresAt");
                if (expiresAt && Date.now() < Number(expiresAt)) {
                    setUserDetails(parsedDetails);
                } else {
                    // Token expired
                    handleLogout();
                }
            } catch (error) {
                console.error("Failed to parse user details:", error);
                handleLogout();
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("userDetails");
        setUserDetails(null);
        navigate("/login");
    };

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
                    {userDetails && (userDetails.role === 'admin' || userDetails.role === 'superadmin') && (
                        <div className={styles.navBarTitles}>
                            <Link to="/employees">Employees</Link>
                        </div>
                    )}
                    {userDetails && (userDetails.role === 'admin' || userDetails.role === 'superadmin') && (
                        <div className={styles.navBarTitles}>
                            <Link to="/admin-sessions">Sessions</Link>
                        </div>
                    )}
                    {!userDetails ? (
                        <div className={styles.navBarTitles}>
                            <Link to="/login">Login</Link>
                        </div>
                    ) : (
                        <div className={styles.navBarTitles}>
                            <button onClick={handleLogout} className="cursor-pointer">Logout</button>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}
