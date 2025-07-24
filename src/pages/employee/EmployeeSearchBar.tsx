import { useState } from "react";
import {useAPI} from "@/hook/useAPI.ts";

type EmployeeSearchBarProps = {
    onSuccess: (employees: any[]) => void;
    onReset: () => void;
};

export default function EmployeeSearchBar({ onSuccess, onReset }: EmployeeSearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const {baseUrl} = useAPI();
    const handleSearch = async (name: string) => {
        setSearchTerm(name);
        if (name == "")  {
            onReset();
        }
        const token = localStorage.getItem("authToken");
        if (!token || !name.trim()) return;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        try {
            const response = await fetch(
                `${baseUrl}/adminEmployee/users/search?name=${encodeURIComponent(name)}`,
                {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                }
            );

            if (!response.ok) {
                console.error("Search failed:", response.status);
                return;
            }

            const result = await response.json();
            console.log("Search result:", result);

            if (result && result.users) {
                onSuccess(result);
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <div className="form-control w-full max-w-xs">
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 opacity-70"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search by first name or last name"
                    className="grow"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </label>
        </div>
    );
}
