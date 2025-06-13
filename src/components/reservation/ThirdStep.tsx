export interface ThirdStepProps {
    setStep: (step: number) => void;
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
    }>>;
}

const ThirdStep: React.FC<ThirdStepProps> = ({ setStep, formData, setFormData }) => {

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
                    <span className="label-text">Number of Guests</span>
                </label>
                <input
                    type="number"
                    name="guests"
                    placeholder="Enter number of guests"
                    className="input input-bordered w-full"
                    value={formData.guests}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep(1)}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setStep(4)}
                    disabled={!formData.date.trim() || !formData.time.trim()}
                >
                    Next
                </button>
            </div>
        </>
    )
}
export default ThirdStep;