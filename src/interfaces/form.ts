import React from "react";

export interface FormReservation {
    name: string;
    email: string;
    date: string;
    guests: string;
    idSlot: string;
    dateSlot: string | null;
}

export interface StepProps {
    formData: FormReservation;
    setFormData: React.Dispatch<React.SetStateAction<FormReservation>>;
}
