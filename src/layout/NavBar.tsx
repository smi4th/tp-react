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
        <div className="flex justify-between bg-gray-700 font-header w-full h-28 border-b-[10px] border-primary relative">
            <img
                src={brandLogo}
                alt="brand-logo"
                className="absolute w-[200px] h-[160px] bottom-[-50px] left-[55px]"
            />
            <div className="text-white font-pirata pl-6 text-[2.5rem] flex items-center">
                <Link to="/" className="hover:underline">LockIn</Link>
            </div>
            <div className="flex justify-around items-center w-full">
                <div className="font-iceland text-white text-[1.5rem] mx-4">
                    <Link to="/" className="hover:underline">Home</Link>
                </div>
                <div className="font-iceland text-white text-[1.5rem] mx-4">
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>
                <div className="font-iceland text-white text-[1.5rem] mx-4">
                    <Link to="/reservation" className="hover:underline">Réserver</Link>
                </div>
                {userDetails && (userDetails.role === 'admin' || userDetails.role === 'superadmin') && (
                    <>
                        <div className="font-iceland text-white text-[1.5rem] mx-4">
                            <Link to="/employees" className="hover:underline">Employees</Link>
                        </div>
                        <div className="font-iceland text-white text-[1.5rem] mx-4">
                            <Link to="/admin-sessions" className="hover:underline">Sessions</Link>
                        </div>
                    </>
                )}
                {!userDetails ? (
                    <div className="font-iceland text-white text-[1.5rem] mx-4">
                        <Link to="/login" className="hover:underline">Login</Link>
                    </div>
                ) : (
                    <div className="font-iceland text-white text-[1.5rem] mx-4">
                        <button onClick={handleLogout} className="cursor-pointer hover:underline bg-transparent border-0">Logout</button>
                    </div>
                )}
            </div>
        </div>
    )
}
