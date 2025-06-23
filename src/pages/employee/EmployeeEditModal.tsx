import { useState } from "react";


export default function EmployeeEditModal({ employee, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        firstname: employee.firstname,
        lastname: employee.lastname,
        email: employee.email,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                            <label className="label">
                                <span className="label-text">Prénom</span>
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                placeholder="Entrez le prénom"
                                className="input input-bordered w-full"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Nom</span>
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Entrez le nom"
                                className="input input-bordered w-full"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Entrez l'adresse email"
                                className="input input-bordered w-full"
                                value={formData.email}
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
