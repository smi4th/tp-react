import React, {useEffect, useState} from "react";
import type {StepProps} from "@interfaces/form.ts";
import {useAPI} from "@/hook/useAPI.ts";

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

const SecondStep: React.FC<StepProps> = ({formData, setFormData}) => {
    const [slotTime, setSlotTime] = useState<Slot[]>([]);
    const {baseUrl} = useAPI()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            try {
                const response = await fetch(`${baseUrl}/slots`);
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

        <div className={"w-full flex flex-col space-y-4"}>
            <div className={"flex flex-col"}>
                <label className="label w-full">
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
            <div className={"flex flex-col"}>

                <label className="label w-full">
                    <span className="label-text">Durée</span>
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
                    Sélectionnez un créneau horaire
                </option>
                {slotTime.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                        {slot.startTime} - {slot.endTime} Escape : <p
                        className={"text-secondary"}>{slot.session.name}</p>
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SecondStep;