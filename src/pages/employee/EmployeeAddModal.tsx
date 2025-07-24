import React, { useState } from "react";

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

    const [dateError, setDateError] = useState<string | null>(null);

    const formatDate = (str: string) => {
        const [day, month, year] = str.split("/");
        return `${year}-${month}-${day}`;
    };

    const isValidDateOrder = (start: string, end: string) => {
        if (!start || !end) return true;
        const startParts = start.split("/").reverse().join("-");
        const endParts = end.split("/").reverse().join("-");
        return new Date(startParts) <= new Date(endParts);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name in formData.contract) {
            setFormData((prev) => ({
                ...prev,
                contract: {
                    ...prev.contract,
                    [name]: value,
                },
            }));

            if (
                (name === "startDate" || name === "endDate") &&
                formData.contract.startDate &&
                (value || formData.contract.endDate)
            ) {
                const startDate =
                    name === "startDate" ? value : formData.contract.startDate;
                const endDate =
                    name === "endDate" ? value : formData.contract.endDate;
                if (endDate && !isValidDateOrder(startDate, endDate)) {
                    setDateError("La date de fin doit être postérieure à la date de début.");
                } else {
                    setDateError(null);
                }
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            formData.contract.startDate &&
            formData.contract.endDate &&
            !isValidDateOrder(formData.contract.startDate, formData.contract.endDate)
        ) {
            setDateError("La date de fin doit être postérieure à la date de début.");
            return;
        }

        const formattedData = {
            ...formData,
            contract: {
                ...formData.contract,
                startDate: formatDate(formData.contract.startDate),
                endDate: formData.contract.endDate
                    ? formatDate(formData.contract.endDate)
                    : null,
            },
        };

        onSubmit(formattedData);
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Créer un nouvel employé</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        name="firstname"
                        placeholder="Prénom"
                        className="input"
                        onChange={handleChange}
                        value={formData.firstname}
                        required
                    />
                    <input
                        name="lastname"
                        placeholder="Nom"
                        className="input"
                        onChange={handleChange}
                        value={formData.lastname}
                        required
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        className="input"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                    <input
                        name="password"
                        placeholder="Mot de passe"
                        type="password"
                        className="input"
                        onChange={handleChange}
                        value={formData.password}
                        minLength={5}
                        required
                    />
                    <select
                        name="role"
                        className="select"
                        onChange={handleChange}
                        value={formData.role}
                    >
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
                    </select>
                    <hr className="my-2" />
                    <input
                        name="title"
                        placeholder="Poste"
                        className="input"
                        onChange={handleChange}
                        value={formData.contract.title}
                        required
                    />
                    <select
                        name="type"
                        className="select"
                        onChange={handleChange}
                        value={formData.contract.type}
                    >
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                    </select>
                    <input
                        name="salary"
                        type="number"
                        placeholder="Salaire annuel"
                        className="input"
                        onChange={handleChange}
                        value={formData.contract.salary}
                        required
                    />
                    <input
                        name="location"
                        placeholder="Lieu"
                        className="input"
                        onChange={handleChange}
                        value={formData.contract.location}
                        required
                    />

                    <label className="font-semibold mt-2">
                        Date de début
                    </label>
                    <input
                        type={"date"}
                        name="startDate"
                        placeholder="01/01/2024"
                        pattern="\d{2}/\d{2}/\d{4}"
                        className={`input ${dateError ? "input-error" : ""}`}
                        onChange={handleChange}
                        value={formData.contract.startDate}
                        required
                    />

                    <label className="font-semibold">
                        Date de fin
                    </label>
                    <input
                        type={"date"}
                        name="endDate"
                        placeholder="31/12/2025"
                        pattern="\d{2}/\d{2}/\d{4}"
                        className={`input ${dateError ? "input-error" : ""}`}
                        onChange={handleChange}
                        value={formData.contract.endDate}
                    />
                    {dateError && (
                        <span className="text-error text-sm">{dateError}</span>
                    )}

                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!!dateError}
                        >
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeAddModal;
