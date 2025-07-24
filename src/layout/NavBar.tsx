import brandLogo from "@assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {useSession} from "@/hook/useSession.ts";

export default function NavBar() {
    const { userDetails, clearSession } = useSession();
    console.log(userDetails);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearSession();
        navigate("/login");
    };

    return (
        <div className="flex justify-between font-Amarante bg-gray-700 w-full h-28 shadow-primary shadow-md relative">
            <div className="text-white pl-6 text-[2.5rem] flex items-center">
                <Link to="/" className="">
                    <img
                        src={brandLogo}
                        alt="brand-logo"
                        className="absolute w-[200px] h-[160px] bottom-[-50px] left-[60px]"
                    />
                    LockIn
                </Link>
            </div>
            <div className="flex justify-around items-center w-full">
                <div className="text-white text-[1.5rem] mx-4">
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>
                <div className="text-white text-[1.5rem] mx-4">
                    <Link to="/reservation" className="hover:underline">Réserver</Link>
                </div>
                {userDetails && (userDetails.role === 'admin' || userDetails.role === 'superadmin') && (
                    <>
                        <div className="text-white text-[1.5rem] mx-4">
                            <Link to="/employees" className="hover:underline">Employés</Link>
                        </div>
                        <div className="text-white text-[1.5rem] mx-4">
                            <Link to="/admin-sessions" className="hover:underline">Sessions</Link>
                        </div>
                    </>
                )}
                {!userDetails ? (
                    <div className="text-white text-[1.5rem] mx-4">
                        <Link to="/login" className="hover:underline">Se connecter</Link>
                    </div>
                ) : (
                    <div className="text-white text-[1.5rem] mx-4">
                        <button
                            onClick={handleLogout}
                            className="cursor-pointer hover:underline bg-transparent border-0"
                        >
                            Déconnexion
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
