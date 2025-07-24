import React, {useState} from "react";
import Steps from "@components/formReservation/Steps.tsx";
import { useMultiStepForm } from "@/hook/useMultiStepForm.ts";
import FirstStep from "@components/formReservation/FirstStep.tsx";
import SecondStep from "@components/formReservation/SecondStep.tsx";
import ThirdStep from "@components/formReservation/ThirdStep.tsx";
import FourthStep from "@components/formReservation/FourthStep.tsx";
import type {FormReservation} from "@interfaces/form.ts";

const Reservation: React.FC = () => {

    const [formData, setFormData] = useState<FormReservation>({
        name: "",
        email: "",
        date: "",
        guests: "",
        idSlot: "",
        dateSlot: null
    });

    const steps = [
        <FirstStep formData={formData} setFormData={setFormData}/>,
        <SecondStep formData={formData} setFormData={setFormData} />,
        <ThirdStep formData={formData} setFormData={setFormData} />,
        <FourthStep
            name={formData.name}
            email={formData.email}
            date={formData.date}
            guests={formData.guests}
            idSlot={formData.idSlot}
            dateSlot={formData.dateSlot}
        />
    ];

    const {
        currentStep,
        step,
        next,
        previous
    } = useMultiStepForm(steps);

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-white ">
            <div className="card w-full max-w-lg shadow-lg p-6 rounded-lg flex flex-col space-y-6 items-center">
                <Steps step={currentStep + 1} />
                    <form className="w-full">
                        {step}
                    </form>

                <div className="join">
                    <button
                        type="button"
                        className="join-item btn"
                        onClick={previous}
                        disabled={currentStep === 0}
                    >
                        «
                    </button>
                    <button className="join-item btn">
                        Page {currentStep + 1}
                    </button>
                    <button
                        type="button"
                        className="join-item btn"
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
