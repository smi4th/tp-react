import React, { useEffect } from "react";

export interface SecondStepProps {
    setStep: (step: number) => void;
    formData: {
        date: string;
        time: string;
        name: string;
        email: string;
        guests: string;
        idSlot: string;
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

const apiUrl = import.meta.env.API_URL || "http://localhost:3000";

type Slot = {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    reservations: any[];
    session: {
        id: number;
        name: string;
        description: string;
        [key: string]: any;
    };
};

const SecondStep: React.FC<SecondStepProps> = ({ setStep, formData, setFormData }) => {
    const [slotTime, setSlotTime] = React.useState<Slot[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            try {
                const response = await fetch(`${apiUrl}/slots`);
                if (!response.ok) {
                    throw new Error("Failed to fetch available slots");
                }
                const data = await response.json();
                setSlotTime(data);
            } catch (error) {
                console.error("Error fetching available slots:", error);
            }
        };
        fetchAvailableSlots();
    }, []);

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
            <select
                className="select select-primary select-bordered w-full"
                defaultValue=""
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        idSlot: e.target.value,
                    }))
                }
            >
                <option disabled value="">
                    Select a time slot
                </option>
                {slotTime.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                        {slot.startTime} - {slot.endTime} Escape : <p className={"text-secondary"}>{slot.session.name}</p>
                    </option>
                ))}
            </select>
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
    );
};

export default SecondStep;