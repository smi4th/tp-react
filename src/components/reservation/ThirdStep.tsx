import React from "react";
import type { StepProps} from "@interfaces/form.ts";

const ThirdStep: React.FC<StepProps> = ({formData, setFormData}) => {

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