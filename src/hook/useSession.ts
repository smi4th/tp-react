import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export interface UserDetails {
    email: string;
    role: string;
    exp: number;
    iat: number;
}

interface UseSessionReturn {
    userDetails: UserDetails | null;
    isAuthenticated: boolean;
    setSession: (token: string) => void;
    clearSession: () => void;
    getToken: () => string | null;
}

export function useSession(): UseSessionReturn {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
        const storedUserDetails = localStorage.getItem("userDetails");
        const expiresAt = localStorage.getItem("expiresAt");
        if (storedUserDetails && expiresAt && Date.now() < Number(expiresAt)) {
            setUserDetails(JSON.parse(storedUserDetails));
        } else {
            clearSession();
        }
    }, []);

    const setSession = (token: string) => {
        const decoded = jwtDecode<UserDetails>(token);
        setUserDetails(decoded);
        localStorage.setItem("authToken", token);
        localStorage.setItem("expiresAt", String(Date.now() + 1000 * 30 * 30));
        localStorage.setItem("userDetails", JSON.stringify(decoded));
    };

    const clearSession = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("userDetails");
        setUserDetails(null);
    };

    const getToken = () => {
        const expiresAt = localStorage.getItem("expiresAt");
        if (expiresAt && Date.now() < Number(expiresAt)) {
            return localStorage.getItem("authToken");
        } else {
            clearSession();
            return null;
        }
    };

    const isAuthenticated = !!userDetails;

    return { userDetails, isAuthenticated, setSession, clearSession, getToken };
}
