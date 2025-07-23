import React from "react";

export interface FormData {
    name: string;
    email: string;
    date: string;
    time: string;
    guests: string;
    idSlot: string;
}

export interface StepProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
