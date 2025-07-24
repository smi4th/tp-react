import React from 'react';
import type {StepProps} from "@interfaces/form.ts";


const FirstStep: React.FC<StepProps> = ({ formData, setFormData }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="w-full flex flex-col space-y-4">
            <div className="flex flex-col w-full">
                <label className="label w-full">
                    <span className="label-text">Nom</span>
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Entrer votre nom"
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col w-full">
                <label className="label w-full">
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
        </div>
    );
};

export default FirstStep;
