export interface SecondStepProps {
    step: number;
    setStep: (step: number) => void;
    formData: {
        date: string;
        time: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
        date: string;
        time: string;
        guests: string;
    }>>;
}
const SecondStep: React.FC<SecondStepProps> = ({ step, setStep, formData, setFormData }) => {

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
                    <span className="label-text">Date</span>
                </label>
                <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full"
                    value={formData.date}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Time</span>
                </label>
                <input
                    type="time"
                    name="time"
                    className="input input-bordered w-full"
                    value={formData.time}
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
                    onClick={() => setStep(3)}
                    disabled={!formData.date.trim() || !formData.time.trim()}
                >
                    Next
                </button>
            </div>
        </>
    )
}
export default SecondStep;