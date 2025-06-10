import React from "react";
import Form from "./Form";
import Steps from "./Steps";

const Reservation: React.FC = () => {

    const [step, setStep] = React.useState(1);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 w-screen">

            <Steps step={step} />

            <Form 
                step={step}
                setStep={setStep}
            />

        </div>
    );
};

export default Reservation;