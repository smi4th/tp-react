import { useState } from "react";
import React from "react";
interface EmployeeAddModalProps {
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const EmployeeAddModal: React.FC<EmployeeAddModalProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "admin",
        contract: {
            title: "",
            type: "CDI",
            salary: "",
            location: "",
            startDate: "",
            endDate: "",
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name in formData.contract) {
            setFormData((prev) => ({
                ...prev,
                contract: {
                    ...prev.contract,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formatDate = (str : string) => {
            const [day, month, year] = str.split("/");
            return `${year}-${month}-${day}`;
        };

        const formattedData = {
            ...formData,
            contract: {
                ...formData.contract,
                startDate: formatDate(formData.contract.startDate),
                endDate: formData.contract.endDate ? formatDate(formData.contract.endDate) : null,
            },
        };

        onSubmit(formattedData);
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Create New Employee</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input name="firstname" placeholder="First Name" onChange={handleChange} value={formData.firstname} required />
                    <input name="lastname" placeholder="Last Name" onChange={handleChange} value={formData.lastname} required />
                    <input name="email" placeholder="Email" type="email" onChange={handleChange} value={formData.email} required />
                    <input name="password" placeholder="Password" type="password" onChange={handleChange} value={formData.password} minLength={5} required />
                    <select name="role" onChange={handleChange} value={formData.role}>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
                    </select>

                    <hr className="my-2" />
                    <input name="title" placeholder="Title" onChange={handleChange} value={formData.contract.title} required />
                    <select name="type" onChange={handleChange} value={formData.contract.type}>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                    </select>
                    <input name="salary" type="number" placeholder="Annual Salary" onChange={handleChange} value={formData.contract.salary} required />
                    <input name="location" placeholder="Location" onChange={handleChange} value={formData.contract.location} required />

                    <label className="font-semibold mt-2">Start Date (dd/mm/yyyy)</label>
                    <input
                        name="startDate"
                        placeholder="01/01/2024"
                        pattern="\d{2}/\d{2}/\d{4}"
                        onChange={handleChange}
                        value={formData.contract.startDate}
                        required
                    />

                    <label className="font-semibold">End Date (dd/mm/yyyy)</label>
                    <input
                        name="endDate"
                        placeholder="31/12/2025"
                        pattern="\d{2}/\d{2}/\d{4}"
                        onChange={handleChange}
                        value={formData.contract.endDate}
                    />

                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmployeeAddModal;
