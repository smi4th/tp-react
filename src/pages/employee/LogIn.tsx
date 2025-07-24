import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import {useAPI} from "@/hook/useAPI.ts";

const LogIn : React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {baseUrl} = useAPI();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function submitData() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(formData);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw
        };
        const logIn = async () => {
            try {
                const response = await fetch(baseUrl + "/auth/login", requestOptions);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                return data;
            } catch (error: any) {
                console.error("Login error:", error.message);
                toast.error(error.message);
                throw error.message;
            }
        }

        logIn().then((data) => {
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("expiresAt", String(Date.now() + 1000 * 30 * 30));

            const decodedToken = jwtDecode(data.token);
            localStorage.setItem("userDetails", JSON.stringify(decodedToken));

            window.location.href = "/employees";
        }).catch((_: any) => {})

    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="card w-full max-w-lg shadow-lg bg-white p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-center">Se connecter</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="text"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary w-full"
                            onClick={submitData}
                            disabled={!formData.password.trim() || !formData.email.trim()}
                        >
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
}

export default LogIn;

