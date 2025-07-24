import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAPI } from "@/hook/useAPI";
import {useSession} from "@/hook/useSession.ts";

const LogIn: React.FC = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { baseUrl } = useAPI();
    const { setSession } = useSession();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function submitData() {
        try {
            const response = await fetch(baseUrl + "/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setSession(data.token);
            window.location.href = "/employees";
        } catch (error: any) {
            toast.error(error.message);
        }
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
                                placeholder="Entrer votre email"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Mot de passe</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Entrer votre mot de passe"
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
