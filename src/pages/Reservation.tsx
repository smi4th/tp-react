import React, {useState} from "react";
import Steps from "@components/reservation/Steps.tsx";
import { useMultiStepForm } from "@/hook/useMultiStepForm.ts";
import FirstStep from "@components/reservation/FirstStep.tsx";
import SecondStep from "@components/reservation/SecondStep.tsx";
import ThirdStep from "@components/reservation/ThirdStep.tsx";
import FourthStep from "@components/reservation/FourthStep.tsx";

const Reservation: React.FC = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        guests: "",
        idSlot: "",
    });

    const steps = [
        <FirstStep formData={formData} setFormData={setFormData}/>,
        <SecondStep formData={formData} setFormData={setFormData} />,
        <ThirdStep formData={formData} setFormData={setFormData} />,
        <FourthStep
            name={formData.name}
            customerEmail={formData.email}
            date={formData.date}
            time={formData.time}
            guests={formData.guests}
            timeSlotId={formData.idSlot}
        />
    ];

    const {
        currentStep,
        step,
        goTo
    } = useMultiStepForm(steps);

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-white ">
            <div className="card w-full max-w-lg shadow-lg p-6 rounded-lg flex flex-col space-y-6 items-center">
                <Steps step={currentStep + 1} />
                    <form className="w-full">
                        {step}
                    </form>

                <div className="join">
                    {steps.map((_, index) => (
                        <button
                            key={index}
                            className={`join-item btn ${currentStep === index ? "btn-active" : ""}`}
                            onClick={() => goTo(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reservation;
