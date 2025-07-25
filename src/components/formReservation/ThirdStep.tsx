import React, { useEffect, useState } from "react";
import type { StepProps } from "@interfaces/form.ts";
import { useSession } from "@/hook/useSession.ts";
import { useAPI } from "@/hook/useAPI.ts";
import type { Room } from "@interfaces/escape.ts";

const ThirdStep: React.FC<StepProps> = ({ formData, setFormData }) => {
    const { getToken } = useSession();
    const { baseUrl } = useAPI();

    const fetchRooms = async () => {
        const token = getToken();
        const res = await fetch(`${baseUrl}/sessions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const roomsData: Room = await res.json();
            return { minParticipants: roomsData.minParticipants, maxParticipants: roomsData.maxParticipants };
        } else {
            return { minParticipants: 2, maxParticipants: 10 };
        }
    };

    const [min, setMin] = useState(2);
    const [max, setMax] = useState(10);

    useEffect(() => {
        fetchRooms().then(({ minParticipants, maxParticipants }) => {
            setMin(minParticipants);
            setMax(maxParticipants);
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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
                min={min}
                max={max}
                placeholder="Entrez le nombre de participants"
                className="input input-bordered w-full validator"
                title={`Nombre de participants entre ${min} et ${max}`}
                required
                pattern={`^[${min}-${max}]+$`}
                value={formData.guests}
                onChange={handleChange}
            />
        </div>
    );
};

export default ThirdStep;