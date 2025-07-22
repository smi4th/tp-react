import React, { useState } from 'react';
import FirstStep from './FirstStep.tsx';
import SecondStep from './SecondStep.tsx';
import ThirdStep from './ThirdStep.tsx';
import FourthStep from './FourthStep.tsx';

export interface FormProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const FormReservation: React.FC<FormProps> = ({ step, setStep }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        guests: "",
        idSlot: "",
    });

    return (
        <div className="card w-full max-w-lg shadow-lg bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Reservation Form</h2>
            <form className="space-y-4">
                {step === 1 && (
                    <FirstStep
                        formData={formData}
                        setFormData={setFormData}
                        setStep={setStep}
                    />
                )}
                {step === 2 && (
                    <SecondStep
                        setStep={setStep}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {step === 3 && (
                    <ThirdStep
                        setStep={setStep}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {step === 4 && (
                    <FourthStep
                        name={formData.name}
                        customerEmail={formData.email}
                        date={formData.date}
                        time={formData.time}
                        guests={formData.guests}
                        timeSlotId={formData.idSlot}
                        setStep={setStep}
                        setFormData={setFormData}
                    />
                )}
            </form>
        </div>
    );
};

export default FormReservation;