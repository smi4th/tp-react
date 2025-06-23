import React from "react";
import FormReservation from "../components/reservation/FormReservation.tsx";
import Steps from "../components/reservation/Steps";

const Reservation: React.FC = () => {

    const [step, setStep] = React.useState(1);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 w-screen">

            <Steps step={step} />

            <FormReservation
                step={step}
                setStep={setStep}
            />

        </div>
    );
};

export default Reservation;