import React from "react";

export interface ThirdStepProps {
    formData: {
        date: string;
        time: string;
        guests: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
        date: string;
        time: string;
        guests: string;
        idSlot: string;
    }>>;
}

const ThirdStep: React.FC<ThirdStepProps> = ({formData, setFormData}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col w-full">
            <label className="label">
                <span className="label-text">Nombre de participants</span>
            </label>
            <input
                type="number"
                name="guests"
                placeholder="Entrez le nombre de participants"
                className="input input-bordered w-full"
                value={formData.guests}
                onChange={handleChange}
            />
        </div>
    )
}
export default ThirdStep;