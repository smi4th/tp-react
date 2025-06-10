import React, { useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';

export interface FormProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Form: React.FC<FormProps> = ({ step, setStep }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        guests: "",
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
                        step={step}
                        setStep={setStep}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {step === 3 && (
                    <ThirdStep
                        step={step}
                        setStep={setStep}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {step === 4 && (
                    <FourthStep
                        name={formData.name}
                        email={formData.email}
                        date={formData.date}
                        time={formData.time}
                        guests={formData.guests}
                        setStep={setStep}
                        setFormData={setFormData}
                    />
                )}
            </form>
        </div>
    );
};

export default Form;