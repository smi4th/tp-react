import { createPortal } from "react-dom";
import { useState } from "react";
import EmployeeAddModal from "./EmployeeAddModal.tsx";
import { toast, ToastContainer } from "react-toastify";
import {useAPI} from "@/hook/useAPI.ts";

export default function NewEmployeeButton({ onSuccess }: { onSuccess: () => void }) {
    const [addModalEmployee, setAddModalEmployee] = useState(false);
    const { baseUrl } = useAPI()

    function createNewEmployee() {
        setAddModalEmployee(true);
    }

    return (
        <>
            <button className="btn btn-primary btn-sm gap-2" onClick={createNewEmployee}>
                <span className="text-lg">+</span> ADD NEW
            </button>

            {addModalEmployee &&
                createPortal(
                    <EmployeeAddModal
                        onClose={() => setAddModalEmployee(false)}
                        onSubmit={async (formData: any) => {
                            try {
                                const userRes = await fetch(`${baseUrl}/auth/signup`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        email: formData.email,
                                        password: formData.password,
                                        firstname: formData.firstname,
                                        lastname: formData.lastname,
                                        role: formData.role,
                                        dateOfBirth: formData.dateOfBirth ?? "1990-01-01",
                                    }),
                                });

                                if (!userRes.ok) {
                                    const err = await userRes.json();
                                    throw new Error(err.message || `Signup failed (${userRes.status})`);
                                }

                                const userData = await userRes.json();
                                const userId = userData.user?.id ?? userData.id;

                                // Create contract
                                const token = localStorage.getItem("authToken");
                                const contractRes = await fetch(`${baseUrl}/adminEmployee/users/contracts`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer " + token,
                                    },
                                    body: JSON.stringify({
                                        userId,
                                        type: formData.contract.type,
                                        title: formData.contract.title,
                                        annualSalary: parseFloat(formData.contract.salary),
                                        location: formData.contract.location,
                                        startDate: formData.contract.startDate,
                                        endDate: formData.contract.endDate || null,
                                    }),
                                });

                                if (!contractRes.ok) {
                                    const err = await contractRes.json();
                                    throw new Error(err.message || `Contract creation failed (${contractRes.status})`);
                                }

                                alert("User and contract created successfully.");
                                setAddModalEmployee(false);
                                onSuccess();

                            } catch (error: any) {
                                toast.error(error.message || "Error during creation.");
                            }
                        }}
                    />,
                    document.body
                )}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
}
