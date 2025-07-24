import { useState } from "react";

interface EmployeeEditModalProps {
    employee: Employee;
    onClose: () => void;
    onUpdate: (data: EmployeeEditFormData) => void;
}

export default function EmployeeEditModal({ employee, onClose, onUpdate }: EmployeeEditModalProps) {
    const [formData, setFormData] = useState<EmployeeEditFormData>({
        firstname: employee.firstname,
        lastname: employee.lastname,
        email: employee.email,
        contract: {
            type: employee.contracts?.[0]?.type ?? "",
            title: employee.contracts?.[0]?.title ?? "",
            annualSalary: employee.contracts?.[0]?.annualSalary ?? "",
            location: employee.contracts?.[0]?.location ?? "",
            startDate: employee.contracts?.[0]?.startDate?.slice(0, 10) ?? "",
            endDate: employee.contracts?.[0]?.endDate?.slice(0, 10) ?? "",
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name in formData.contract) {
            setFormData((prev) => ({
                ...prev,
                contract: {
                    ...prev.contract,
                    [name]: value
                }
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        onUpdate(formData);
        onClose();
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <div className="card w-full max-w-lg shadow-lg bg-white p-6 rounded-lg mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center">Modifier l'employé</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="label">Prénom</label>
                            <input
                                type="text"
                                name="firstname"
                                className="input input-bordered w-full"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">Nom</label>
                            <input
                                type="text"
                                name="lastname"
                                className="input input-bordered w-full"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="divider">Contrat</div>
                        <div>
                            <label className="label">Type</label>
                            <select
                                name="type"
                                className="select select-bordered w-full"
                                value={formData.contract.type}
                                onChange={handleChange}
                            >
                                <option value="">Choisir un type</option>
                                <option value="CDI">CDI</option>
                                <option value="CDD">CDD</option>
                                <option value="Stage">Stage</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Titre</label>
                            <input
                                type="text"
                                name="title"
                                className="input input-bordered w-full"
                                value={formData.contract.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">Salaire annuel (€)</label>
                            <input
                                type="number"
                                name="annualSalary"
                                className="input input-bordered w-full"
                                value={formData.contract.annualSalary}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">Lieu</label>
                            <input
                                type="text"
                                name="location"
                                className="input input-bordered w-full"
                                value={formData.contract.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">Date de début</label>
                            <input
                                type="date"
                                name="startDate"
                                className="input input-bordered w-full"
                                value={formData.contract.startDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">Date de fin</label>
                            <input
                                type="date"
                                name="endDate"
                                className="input input-bordered w-full"
                                value={formData.contract.endDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex gap-4 mt-4 flex-col items-center justify-center">
                            <button
                                type="button"
                                className="btn btn-primary w-full"
                                onClick={handleSubmit}
                            >
                                Enregistrer
                            </button>
                            <button
                                type="button"
                                className="btn w-full"
                                onClick={onClose}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
