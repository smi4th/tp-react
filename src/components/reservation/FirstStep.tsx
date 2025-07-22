import React from 'react';

export interface FirstStepProps {
    formData: {
        name: string;
        email: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
        date: string;
        time: string;
        guests: string;
        idSlot: string;
    }>>;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const FirstStep: React.FC<FirstStepProps> = ({ formData, setFormData, setStep }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <div>
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                    value={formData.name}
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
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => setStep(2)}
                disabled={!formData.name.trim() || !formData.email.trim()}
            >
                Next
            </button>
        </>
    );

};

export default FirstStep;